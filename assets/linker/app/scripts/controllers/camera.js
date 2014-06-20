'use strict';

/**
 * @ngdoc function
 * @name linkerApp.controller:CameraCtrl
 * @description
 * # CameraCtrl
 * Controller of the linkerApp
 */
angular.module('linkerApp')
  .controller('CameraCtrl', function ($scope, $socket) {
    $scope.project =  { }
    $scope.project['name'] = "Nat's Project"

    $socket.on('connectedUsers', function(data) {
        $scope.connectedUsers = data;
    })

    $scope.processStatus = 'success';


    $scope.$on('$viewContentLoaded', function() {
      var video = angular.element('#live')[0];
      var canvas = angular.element('#canvas')[0];
      var ctx = canvas.getContext('2d');
      var processed_canvas = angular.element('#processed_canvas')[0];
      var processed_ctx = processed_canvas.getContext('2d');

      $scope['frame'] = 0;
      $scope.fps = 7;

      var flip_obj = {
        success: 'warning',
        warning: 'success'
      }

      $scope.$watch('fps', function(newValue, oldValue) {
        clearInterval($scope.timer);
        $scope.timer = setInterval(timer_callback, 1000/newValue);
      });

      $socket.on('face_data', function(d) {
        $scope.src_gray = 'data:image/jpeg;base64,'+d.image_gray;
        $scope.src_hsv = 'data:image/jpeg;base64,'+d.image_hsv;
        $scope.src_face = 'data:image/jpeg;base64,'+d.image_face;
        $scope.src_orig = d.image_orig;
      })
   
      $scope.process = function() {
        $scope.processStatus = flip_obj[$scope.processStatus];
        console.log('capting..', $scope.processStatus);
      }

      var streaming_callback = function(stream) {
        // video.src = webkitURL.createObjectURL(stream);
        video.src = window.URL.createObjectURL(stream); 
      }
      var error_callback = function(err) {
        console.log("Unable to get video stream!")
      }

      var timer_callback = function() {
        ctx.drawImage(video, 0, 0, 320, 240);

        if ($scope.processStatus == 'warning') {
          var imageData = ctx.getImageData(0, 0, 320, 240);
          processed_ctx.putImageData(imageData, 0, 0);
          $scope.processStatus = 'success';

          Caman(processed_canvas,  function () {
            this.revert(true);
            this.brightness(15);
            this.exposure(15);
            this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
            this.saturation(-20);
            this.gamma(1.8);
            this.vignette("10%", 40);
            this.render(function(r) {});
          }); 
        }

        $scope['frame'] ++;
        $scope.image_data = canvas.toDataURL('image/jpeg');
        $socket.emit('frame', $scope.image_data);
        $scope.$apply();

      }
      $scope.capture = function() {
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({ video: true, audio: false }, streaming_callback, error_callback);
      }
      $scope.timer = setInterval(timer_callback, 1000/$scope.fps);

  });
});
