app.get('/',(req,res) => {
    console.log("in server auth req:" , req);
    userList[req.session.id] = 5;
})