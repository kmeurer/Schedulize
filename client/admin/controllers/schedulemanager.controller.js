'use strict';
var adminApp = angular.module('adminApp');

adminApp
.controller('scheduleManagerCtrl', function($scope, $http, $location, Schedule){
  // Get all Schedules(eventually for logged in company)
  Schedule.getAllSchedules().then(function(data){
    $scope.schedules = data;
  });
})
.controller('scheduleViewCtrl', function($scope, $stateParams, Schedule){
  $scope.changed = false;
  $scope.editableSchedule = true;
  var colors = ['#26A65B', '#466272', '#009688', '#C40000', '#FF9800', '#673AB7', '#1C262B'];// [dark blue, orange, teal, red, purple, green] green, red, purple, teal, orange]
  // Called after finding the schedule
  $scope.renderEvents = function(events){
    console.log($scope.loadEvents)
    $scope.loadEvents(events);
  }

  // Get current schedule
  Schedule.getOneSchedule($stateParams.scheduleId).then(function(schedule){
    $scope.activeSchedule = schedule;
    $scope.renderEvents($scope.activeSchedule.shifts);
    $scope.scheduleRole = $scope.activeSchedule.roles.length ? $scope.activeSchedule.roles[0] : null;
    console.log($scope.scheduleRole);
  });

  $scope.setScheduleMode = function(role){
    $scope.scheduleRole = role;
    console.log($scope.scheduleRole);
  }

  // Add a Role to the Schedule
  $scope.addRole = function(){
    var role = $('#role-input').val();
    $('#role-input').val('');
    if(!$scope.activeSchedule.roles.length){
      $scope.scheduleRole = role;
    }
    $scope.activeSchedule.roles.push({name: role, color: colors[$scope.activeSchedule.roles.length] });
    $scope.changed = true;
    console.log($scope.scheduleRole);
  }

  // Save changes when made to the schedule
  $scope.saveChanges = function(schedule){
    Schedule.updateSchedule(schedule).then(function(schedule){
      $scope.changed = false;
      $scope.activeSchedule = schedule;
      console.log("Updated Schedule");
    });
  };
  $scope.deleteSchedule = function(schedule){
    Schedule.deleteSchedule(schedule).then(function(schedule){
      console.log("Schedule Deleted");
    });
  };

})
.controller('createScheduleCtrl', function($scope, $http, $location, Schedule){
	$scope.newSchedule = {
    template: false,
    name: "",
    templateSchedule: null
  };
	$scope.submitSchedule = function(schedule){
    Schedule.postNewSchedule(schedule)
			.success(function(data, status){
        console.log("successful POST", status);
        data.createdAt = moment(data.createdAt).format('MMMM Do, YYYY');
        // Prepend to schedules for fast UX
        $scope.$parent.schedules.unshift(data);
      });
	};
});
