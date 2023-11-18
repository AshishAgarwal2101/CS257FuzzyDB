const queries = require("./queries");
const { Parser } = require("node-sql-parser");
const similarityAlgorithms = require("./similarityAlgorithms");

const parser = new Parser();

const getData = async(tableName) => {
    if(tableName.toUpperCase() === "USER") {
        return await queries.getAllUsers();
    }
    else if(tableName.toUpperCase() === "SELLER") {
        return await queries.getAllSellers()
    } 
    else {
        return await queries.getAllProducts();
    }
};

const isSimilar = (algorithm, left, right) => {
    left = left.toUpperCase();
    right = right.toUpperCase();
    //console.log("Algo " + algorithm + " for str " +left + " and str " +right);
    if(algorithm.toUpperCase() === "LEVENSHTEIN") {
        return similarityAlgorithms.isLevenshteinDistanceSimilar(left, right);
    }
    else if(algorithm.toUpperCase() === "SOUNDEX") {
        return similarityAlgorithms.isSoundexSimilar(left, right);
    }
    else if(algorithm.toUpperCase() === "METAPHONE") {
        return similarityAlgorithms.isMetaphoneSimilar(left, right);
    }
    else if(algorithm.toUpperCase() === "COSINE") {
        return similarityAlgorithms.isCosineSimilar(left, right);
    }
    return false;
}

const filterKeys = (jsObj, keys) => {
    return Object.fromEntries(
        Object.entries(jsObj).filter(
            ([key]) => keys.includes(key)
        )
    )
}

module.exports = {
    getUserSellerJoinLevenshtein: async (userCol, sellerCol) => {
        let users = await queries.getAllUsers();
        let sellers = await queries.getAllSellers();
        let userSellerJoined = users.flatMap((user) => {
            let userColData = user[userCol];
            return sellers
                .map((seller) => {
                    let sellerColData = seller[sellerCol];
                    if(similarityAlgorithms.isLevenshteinDistanceSimilar(userColData, sellerColData)) {
                        return {user, seller};
                    }
                    else {
                        return null;
                    }
                })
                .filter((userSeller) => userSeller !== null);
        });

        return userSellerJoined;

    }, 
    getUserSellerJoinSoundex: async (userCol, sellerCol) => {
        let users = await queries.getAllUsers();
        let sellers = await queries.getAllSellers();
        let userSellerJoined = users.flatMap((user) => {
            let userColData = user[userCol];
            return sellers
                .map((seller) => {
                    let sellerColData = seller[sellerCol];
                    if(similarityAlgorithms.isSoundexSimilar(userColData,sellerColData)) {
                        return {user, seller};
                    }
                    else {
                        return null;
                    }
                })
                .filter((userSeller) => userSeller !== null);
        });

        return userSellerJoined;
    },
    getUserSellerJoinMetaphone: async (userCol, sellerCol) => {
        let users = await queries.getAllUsers();
        let sellers = await queries.getAllSellers();
        let userSellerJoined = users.flatMap((user) => {
            let userColData = user[userCol];
            return sellers
                .map((seller) => {
                    let sellerColData = seller[sellerCol];
                    if(similarityAlgorithms.isMetaphoneSimilar(userColData,sellerColData)) {
                        return {user, seller};
                    }
                    else {
                        return null;
                    }
                })
                .filter((userSeller) => userSeller !== null);
        });

        return userSellerJoined;
    },
    searchTables: async(searchStr) => {
        let users = await queries.getAllUsers();
        let sellers = await queries.getAllSellers();
        let products = await queries.getAllProducts();
        const userMatches = users.filter((user) => user.username.toUpperCase() === searchStr.toUpperCase());
        const sellerMatches = sellers.filter((seller) => seller.sellername.toUpperCase() === searchStr.toUpperCase());
        const productMatches = products.filter((product) => product.name.toUpperCase() === searchStr.toUpperCase());

        const userMatchStrings = userMatches.map((user) => user.username);
        const sellerMatchStrings = sellerMatches.map((seller) => seller.sellername);
        const productMatchStrings = productMatches.map((product) => product.name);
        const allMatchStrings = [];
        allMatchStrings.push(...userMatchStrings);
        allMatchStrings.push(...sellerMatchStrings);
        allMatchStrings.push(...productMatchStrings);

        const usernames = users.map((user) => user.username);
        const sellernames = sellers.map((seller) => seller.sellername);
        const productNames = products.map((product) => product.name);
        const allExistingKeywordsInTable = [];
        allExistingKeywordsInTable.push(...usernames)
        allExistingKeywordsInTable.push(...sellernames)
        allExistingKeywordsInTable.push(...productNames);

        let similarMatcheStringsLevseshtein = allExistingKeywordsInTable.filter((keyword) => isSimilar("LEVENSHTEIN", keyword, searchStr));
        let similarMatcheStringsSoundex = allExistingKeywordsInTable.filter((keyword) => isSimilar("SOUNDEX", keyword, searchStr));
        let similarMatcheStringsMetaphone = allExistingKeywordsInTable.filter((keyword) => isSimilar("METAPHONE", keyword, searchStr));
        let similarMatcheStringsCosine = allExistingKeywordsInTable.filter((keyword) => isSimilar("COSINE", keyword, searchStr));
        let similarMatchStrings = [];
        similarMatchStrings.push(...similarMatcheStringsLevseshtein);
        similarMatchStrings.push(...similarMatcheStringsSoundex);
        similarMatchStrings.push(...similarMatcheStringsMetaphone);
        similarMatchStrings.push(...similarMatcheStringsCosine);

        //removing already found
        similarMatchStrings = similarMatchStrings.filter((similarStr) => !allMatchStrings.includes(similarStr));
        similarMatchStrings = similarMatchStrings.map((str) => str.toLowerCase());
        similarMatchStrings = Array.from(new Set(similarMatchStrings));

        return {
            users: userMatches,
            sellers: sellerMatches,
            products: productMatches,
            similarStrings: similarMatchStrings
        };
    },
    executeQueryWithJoin: async (sql, algorithm) => {
        let ast = parser.astify(sql);
        let tables = ast.from.map((fromTableJson) => fromTableJson.table);
        let variableTableMap = new Map(
            ast.from.map((fromTableJson) => {return [fromTableJson.as, fromTableJson.table]})
        )
        let tableData = await Promise.all(tables.map((table) => getData(table)));
        let tableDataMap = new Map(
            tables.map((table, index) => {
                return [table, tableData[index]];
            })
        );

        tableDataMap = Object.fromEntries(tableDataMap);
        variableTableMap = Object.fromEntries(variableTableMap);

        //extracting AST data
        let columnLeft = ast.where.left.column; 
        let columnRight = ast.where.right.column; 
        let tableLeft = variableTableMap[ast.where.left.table];
        let tableRight = variableTableMap[ast.where.right.table];
        let projectedColumnsLeft = ast.columns.filter((column) => {
            return !column.expr.table || variableTableMap[column.expr.table] === tableLeft;
        }).map((column) => column.expr.column);
        let projectedColumnsRight = ast.columns.filter((column) => {
            return !column.expr.table || variableTableMap[column.expr.table] === tableRight;
        }).map((column) => column.expr.column);

        let leftTableData = tableDataMap[tableLeft];
        let rightTableData = tableDataMap[tableRight];

        //applying the join
        let joined = leftTableData.flatMap((left) => {
            let leftColData = left[columnLeft];
            return rightTableData
                .map((right) => {
                    let rightColData = right[columnRight];
                    if(isSimilar(algorithm, leftColData, rightColData)) {
                        return {
                            [tableLeft]: left, 
                            [tableRight]: right
                        };
                    }
                    else {
                        return null;
                    }
                })
                .filter((leftRight) => leftRight !== null);
        });

        //projecting columns
        return joined.map((join) => {
            return {
                [tableLeft]: filterKeys(join[tableLeft], projectedColumnsLeft),
                [tableRight]: filterKeys(join[tableRight], projectedColumnsRight)
            }
        })
    }
    ,
    getUserSellerJoinCosineSimilarity: async (userCol, sellerCol) => {
        let users = await queries.getAllUsers();
        let sellers = await queries.getAllSellers();
        let userSellerJoined = users.flatMap((user) => {
            let userColData = user[userCol];
            return sellers
                .map((seller) => {
                    let sellerColData = seller[sellerCol];
                    if(similarityAlgorithms.isCosineSimilar(userColData, sellerColData)) {
                        return {user, seller};
                    }
                    else {
                        return null;
                    }
                })
                .filter((userSeller) => userSeller !== null);
        });

        return userSellerJoined;

    }
}