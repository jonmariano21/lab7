var models = require('../models');

exports.projectInfo = function(req, res) {

  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  
  //SLIDE 46
  //Find the project w/projectID
  models.Project
  	.find({
	  	"_id":projectID
  	})
  	.exec( afterQuery );

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  
  //SLIDE 52
  var myProj = new models.Project({
	 
	 "title": form_data["project_title"],
	 "date": form_data["date"],
	 "summary": form_data["summary"],
	 "image": form_data["image_url"], 
  });
  
  myProj.save(doAfterSave);
  
  function doAfterSave( err ) {
	  if( err ){
		  console.log( err );
	  }
	  
	  res.redirect('/');
	  res.send('GOOD');
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  
  //SLIDE 49
  //Find the project w/id matching projectID and delete that shizz...
  models.Project
  .find({
	  "_id":projectID
  })
  .remove(afterQuery);
  
  //call res.send() so that server does not hang
  function afterQuery( err, projects ){
	  if(err){
		  console.log( err );
	  }
	  
	  res.send('GOOD');
  }
}