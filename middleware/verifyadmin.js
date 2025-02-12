

const checkAdmin = (req,res,next) => {
    if(req.user && req.user.roles === "admin"){
        console.log(req.user.roles);
        next();
    }else{
        console.log(req.user.roles)
        return res.status(403).json({error: "Forbidden Admins only"})
    }
};

module.exports = checkAdmin;