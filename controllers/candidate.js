const xlsx = require("xlsx");
const async = require('async');
const mongoose = require("mongoose");
const Candidate = require('../models/candidate.js');




const addCandidate = async(req, res) => {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
    const candidates = xlsx.utils.sheet_to_json(worksheet);
    let failure  = 0;

  
      await async.eachSeries(candidates, async (candidate) => {
       try{
        const newCandidate = {
          name: candidate["Name of the Candidate"],
          email: candidate["Email"],
          mobile: candidate["Mobile No."],
          dateofBirth: candidate["Date of Birth"],
          workExperience: candidate["Work Experience"],
          resumeTitle: candidate["Resume Title"],
          currentLocation: candidate["Current Location"],
          postalAddress: candidate["Postal Address"],
          currentEmployer: candidate["Current Employer"],
          currentDesignation: candidate["Current Designation"]
        };
        const candidateModel = new Candidate(newCandidate);
        await candidateModel.save();
        }catch(error){
            if(error){
                failure++;
            }
        }
      })
      if(!failure){
        res.status(200).json({message:"Sucess",success:(candidates.length - failure), failure:failure,total:candidates.length});
      }
      else if(failure === candidates.length){
        res.status(400).json({message:"Failed",success:(candidates.length - failure),failure:failure,total:candidates.length});
      }
      else{
        res.status(200).json({message:"Sucess",success:(candidates.length - failure), failure:failure,total:candidates.length});
      }
    

};

module.exports = {addCandidate};