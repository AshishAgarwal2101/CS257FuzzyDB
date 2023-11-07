const queries = require("./queries");
const similarityAlgorithms = require("./similarityAlgorithms");

module.exports = {
    getUserSellerJoin: async (userCol, sellerCol) => {
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
    }
}