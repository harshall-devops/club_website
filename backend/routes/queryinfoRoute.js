const express=require ("express");
const router=express.Router();

//Declaring the functions used
const {
    queriesSend,
    showQueries,
    seeAllQueries,
    markSolved
}=require('../controllers/queryInfoHandleController')

// Apis for user's query info manipulation.
router.post("/queriesSend",queriesSend);
router.get("/showQueries",showQueries);
router.get("/seeAllQueries",seeAllQueries);
router.put("/markSolved/:queryId",markSolved)
module.exports=router;