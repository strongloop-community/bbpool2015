Roster.directive('bbpPlayerForm', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.player.form.html',
      controller: [
        '$scope',
        '$log',
        'Roster',
        function($scope, $log, Roster) {
          $scope.clearEditPlayer = function() {
            delete $scope.currentEditRoster.editPlayer;



          };
          $scope.saveEditPlayer = function() {
            var rosterObj = $scope.currentEditRoster;
            delete rosterObj._id;
            Roster.upsert(rosterObj,
              function(response){
                console.log('good update roster');
                var filter = {
                  'filter[where][slug]':$scope.currentRosterName
                };
                $scope.currentRoster = Roster.query(filter);
                $scope.currentRoster.$promise.then(function (result) {
                  $scope.currentRoster = result[0];

                  $scope.players = $scope.currentRoster.players;
                  $scope.player = {
                    draftStatus:'roster',
                    status:'regular',
                    posType:'hitter'
                  };
                });
              },
              function(response){
                console.log('bad update roster');
              }
            );

          }

        }
      ]
    }
  }
]);

Roster.directive('bbpDraftRosterView', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/draft.roster.view.html'
    }
  }
]);
Roster.directive('bbpDraftRosterBashers', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.roster.list.html',
      link: function(scope, el, attrs) {


      }
    }
  }
]);
Roster.directive('bbpDraftRosterRallycaps', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.roster.list.html',
      link: function(scope, el, attrs) {


      }
    }
  }
]);
Roster.directive('bbpDraftRosterStallions', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.roster.list.html',
      link: function(scope, el, attrs) {


      }
    }
  }
]);
Roster.directive('bbpDraftRosterMashers', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/draft/templates/draft.roster.list.html',
      link: function(scope, el, attrs) {


      }
    }
  }
]);
Roster.directive('bbpRosterEdit', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.edit.html',
      controller: [
        '$scope',
        '$log',
        'RosterService',
        'Roster',
        '$state',
        '$stateParams',
        function ($scope, $log, RosterService, Roster, $state, $stateParams) {

          $scope.currentEditRoster = {
            slug:'bashers'
          };

          if ($stateParams.slug) {

            $scope.currentEditRoster.slug = $stateParams.slug;

          }


          $scope.updatePlayerPos = function() {
            Roster.upsert($scope.currentEditRoster.roster,
              function(response){
                console.log('good update roster');
                $scope.currentEditRoster = RosterService.getRoster($scope.currentEditRoster.slug)
                  .then(function(roster) {
                    roster.players = $scope.positionSort(roster);

                    $scope.currentEditRoster.roster = roster;
                  });
              },
              function(response){
                console.log('bad update roster');
              }
            );
          };

          $scope.editPlayer = function(player) {
            $scope.currentEditRoster.editPlayer = player;
          };

          // init the roster for editing
          $scope.currentEditRoster = RosterService.getRoster($scope.currentEditRoster.slug)
            .then(function(roster) {
              roster.players = $scope.positionSort(roster);

              $scope.currentEditRoster.roster = roster;
            });

        }
      ]
    }
  }
]);

Roster.directive('bbpProtectedRoster', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

          $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

          $scope.activeTabIndex = 0;

          $scope.currentRoster = 'bashers';
          if ($stateParams.slug) {

            $scope.currentRoster = $stateParams.slug;
          }



          $scope.isDisabled = function(rosterSlug) {
            if ($scope.bbpCtx.homeRoster === rosterSlug) {
              return false;
            }
            if ($scope.bbpCtx.homeRoster === 'dog') {
              return false;
            }
            return true;
          }

        }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
Roster.directive('bbpProtectedRosterList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.list.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

        $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

        $scope.activeTabIndex = 0;
        $scope.currentRoster = 'bashers';
        if ($stateParams.slug) {

          $scope.currentRoster = $stateParams.slug;
        }

        $scope.isDisabled = function(rosterSlug) {
          if ($scope.bbpCtx.homeRoster === rosterSlug) {
            return false;
          }
          if ($scope.bbpCtx.homeRoster === 'dog') {
            return false;
          }
          return true;
        }

      }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
/*
*
*  http://pool2015.herokuapp.com/#authuser/rallycaps
 * http://pool2015.herokuapp.com/#authuser/bashers
 * http://pool2015.herokuapp.com/#authuser/mashers
 * http://pool2015.herokuapp.com/#authuser/stallions
*
* */
