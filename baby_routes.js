var _ = require('lodash');
var Baby = require('./baby_model.js');

module.exports = function(app) {
    
    /* Create */    
    app.post('/baby', function (req, res) {
        var newBaby = new Baby(req.body);
        newBaby.save(function(err) {
            if (err) {
                res.json({info: 'error during baby create', error: err});
            };
            res.json({info: 'baby created successfully'});
        });
    });
    
    /* Read */    
    app.get('/baby', function (req, res) {
        Baby.find(function(err, babies) {
            if(err) {
                res.json({info: 'error during find babies', error: err});
            };
            res.json({info: 'babies found successfully', data: babies});
        });
    });        
    app.get('/baby/:id', function (req, res) {
        Baby.findById(req.params.id, function(err, baby) {
            if(err) {
                res.json({info: 'error during find baby', error: err});
            };
            if(baby) {
                res.json({info: 'baby found successfully', data: baby});
            } else {
                res.json({info: 'baby not found'});
            }            
        });
    });    
    
    /* Update */
    app.put('/baby/:id', function (req, res){
       Baby.findById(req.params.id, function(err, baby) {
           if (err) {
               res.json({info: 'error during find baby', error: err});
           };
           if (baby) {
               _.merge(baby, req.body);
               baby.save(function(err) {
                  if (err) {
                      res.json({info: 'error during baby update', error: err});
                  }
                  res.json({info: 'baby updated successfully'});
               });
           } else {
               res.json({info: 'baby not found'});
           }
       });
    });    
    
    /* Delete */
    app.delete('/baby/:id', function (req, res) {
        Baby.findByIdAndRemove(req.params.id, function(err) {
           if (err) {
               res.json({info: 'error during remove baby', error: err});
           };
           res.json({info: 'baby removed successfully'});
        });
    });
};