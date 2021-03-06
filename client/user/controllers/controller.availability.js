'use strict';
var userApp = angular.module('userApp');

userApp.controller('availabilityController', function($scope, $location, User, Schedule){
  $scope.changed = false;
  $scope.renderMode = 'preferred';
  
  $scope.updateChanged = function(){
    $scope.changed = true;
  };
  $scope.update = function(){
    $scope.changed = true
  };
  $scope.setRenderMode = function(mode){
    $scope.renderMode = mode;
  };
  
  $scope.renderEvents = function(events){
    $scope.loadEvents();
  };

  $scope.updateAvailability = function(){
    var data = {
      availability: Array.prototype.slice.call($scope.availability),
      eligibleRoles: Array.prototype.slice.call($scope.userRoles),
      shiftsDesired: $scope.user.shiftsDesired
    }
    console.log(data);
    for( var i = 0; i < data.availability.length; i++ ){
      data.availability[i].source = null;
    }
    User.updateUserAvailability(data).then(function(updatedUser){
      $scope.changed = false;
      console.log("updated User");
    });
  };

  $scope.clearAvailability = function(){
    swal({ 
      title: "Are you sure?", 
      text: "You will not be able to undo this action.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      closeOnConfirm: false 
    }, function(){
      var data = {
        availability: [],
        eligibleRoles: [],
        shiftsDesired: 0
      }
      User.clearUserAvailability(data).then(function(updatedUser){
        $scope.availability = [];
        $scope.userRoles = [];
        $scope.user.shiftsDesired = null;
        $('#availabilityCal').fullCalendar( 'removeEvents' );
        console.log('done');
        swal("Availability Cleared", "", "success")
      });
    });  

  };

  User.getUser().then(function(user){
    if(user.availability){
      $scope.availability = user.availability;
      $scope.renderEvents();
      $scope.availabilitySubmitted = true;
    } else {
      $scope.availability = [];
      $scope.renderEvents();
      $scope.availabilitySubmitted = false;
    }
    $scope.user = user;
    Schedule.getUserSchedules($scope.user.companies[0]._id).then(function(schedules){
      $scope.roles = [];
      console.log($scope.user);
      $scope.userRoles = $scope.user.eligibleRoles;
      for(var i = 0; i < schedules.length; i++){
        var sched = schedules[i];
        for(var j = 0; j < sched.roles.length; j++){
          if($scope.roles.indexOf(sched.roles[j].name) === -1){
            $scope.roles.push(sched.roles[j].name);
          }
        }
      }
    })
  });

});