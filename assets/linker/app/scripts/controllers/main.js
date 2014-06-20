'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {
    $scope.project =  { }
    $scope.project['name'] = "Nat's Project"

	  $socket.on('connectedUsers', function(data) {
				$scope.connectedUsers = data;
	  })

    $scope.captureStatus = 'success';

    $scope.$on('$viewContentLoaded', function() {
      var video = angular.element('#live')[0];
      var canvas = angular.element('#canvas')[0];
      var ctx = canvas.getContext('2d');
      var processed_canvas = angular.element('#processed_canvas')[0];
      var processed_ctx = processed_canvas.getContext('2d');

      $scope['frame'] = 0;
      $scope.fps = 1;

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
        $scope.src_orig = d.image_orig;
      })
   
      $scope.capture = function() {
        $scope.captureStatus = flip_obj[$scope.captureStatus];
        console.log('capting..', $scope.captureStatus);
      }

      var streaming_callback = function(stream) {
        // video.src = webkitURL.createObjectURL(stream);
        video.src = window.URL.createObjectURL(stream); 
      }
      var error_callback = function(err) {
        console.log("Unable to get video stream!")
      }

      navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      navigator.getMedia({ video: true, audio: false }, streaming_callback, error_callback);

      var timer_callback = function() {
        ctx.drawImage(video, 0, 0, 320, 240);

        if ($scope.captureStatus == 'warning') {
          var imageData = ctx.getImageData(0, 0, 320, 240);
          processed_ctx.putImageData(imageData, 0, 0)
          $scope.captureStatus = 'success';

          Caman(processed_canvas,  function () {
            this.brightness(10);
            this.contrast(30);
            this.sepia(60);
            this.saturation(-30);
            this.render(function(r) {
              console.log(arguments);
            });
            // $scope.src_caman = this.toBase64();
            // $scope.$apply();
          }); 
        }

        $scope['frame'] ++;
        $scope.image_data = canvas.toDataURL('image/jpeg');
        $socket.emit('frame', $scope.image_data);
        $scope.$apply();
        // var data = canvas.get()[0].toDataURL('image/jpeg', 1.0);
        // newblob = dataURItoBlob(data);
      }

      $scope.timer = setInterval(timer_callback, 1000/$scope.fps);

    });
  });
