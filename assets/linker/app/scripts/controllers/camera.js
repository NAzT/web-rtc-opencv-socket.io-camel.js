'use strict';

/**
 * @ngdoc function
 * @name linkerApp.controller:CameraCtrl
 * @description
 * # CameraCtrl
 * Controller of the linkerApp
 */
angular.module('linkerApp')
  .controller('CameraCtrl', function ($scope, $socket, $rootScope) {
    $scope.page = "camera.js"
    $scope.project =  { }
    $scope.project['name'] = "Nat's Project"

    $socket.on('connectedUsers', function(data) {
        $scope.connectedUsers = data;
    })

    $scope.processStatus = 'success';
    
    $scope.$watch('fps', function(newValue, oldValue) {
      console.log("...WATCHING FPS....", newValue, oldValue);
      clearInterval($scope.timer);
      $scope.timer = setInterval($scope.timer_callback, 1000/newValue);
    });      

    $scope.$watch('value', function(newValue, oldValue) {
      console.log("value..", newValue, oldValue);
    });    

    $scope.$on('$viewContentLoaded', function() {
      var video = angular.element('#live')[0];
      var canvas = angular.element('#canvas')[0];
      var ctx = canvas.getContext('2d');
      var processed_canvas = angular.element('#processed_canvas')[0];
      var processed_ctx = processed_canvas.getContext('2d');

      $scope['frame'] = 0;
      $scope.fps = 3;
      $scope.capture_num = 0;
      $scope.streaming = false;

      var flip_obj = {
        success: 'warning',
        warning: 'success'
      }

      $scope.change_fps = function() {
        console.log("HELLO", $scope.fps);
      }

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

      $scope.streaming_callback = function(stream) {
        // video.src = webkitURL.createObjectURL(stream);
        video.src = window.URL.createObjectURL(stream); 
        $scope.streaming = true;
      }

      $scope.error_callback = function(err) {
        console.log("Unable to get video stream!")
        $scope.streaming = false;
      }

      $scope.timer_callback = function() {
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

        if ($scope.streaming) {
          $scope['frame'] ++;
          $scope.image_data = canvas.toDataURL('image/jpeg');
          $socket.emit('frame', $scope.image_data);
        }
        $scope.$apply();

      }
      $scope.capture = function() {
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({ video: true, audio: false }, $scope.streaming_callback, $scope.  error_callback);
        $scope.capture_num++;
      }
      $scope.timer = setInterval($scope.timer_callback, 1000/$scope.fps);

  });
});
