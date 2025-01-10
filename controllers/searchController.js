exports.getSuggestion=async (req,res)=>{
    try{
       const suggestions=req.suggestions || [];
        return res.status(200).json({suggestions})
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again.' });
    }
}