// code for browser detection
// function hasGetUserMedia() {
//  return !!(navigator.getUserMedia || 
//          navigator.webkitGetUserMedia || 
//          navigator.mozGetUserMedia || 
//          navigator. msGetUserMedia);
// }


var leftChannel = [];
var rightChannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = 44100;
var audioContext = null;
var context = null;


console.log(navigator);
navigator.getUserMedia = navigator.getUserMedia || 
			navigator.webkitGetUserMedia || 
			navigator.mozGetUserMedia || 
			navigator. msGetUserMedia;


//get access to the microphone
if ( navigator.getUserMedia) {
	navigator.getUserMedia({audio:true}, success, function(e){
		alert("error capturing audio");
		}
	);
} else {
	alert("your browser does not support recording");
}

var success = function(e) {
	//creates the audio context
	var audioContext = window.AudioContext || window.webkitAudioContext;
	context = new audioContext();

	//creates a gain node
	var volume = context.createGain();

	// creates an audio node from the microphone incoming stream
	var audioInput = context.createMediaStreamSource(e);
 
	// connect the stream to the gain node
	audioInput.connect(volume);
 
	/* From the spec: This value controls how frequently the audioprocess event is 
	dispatched and how many sample-frames need to be processed each call. 
	Lower values for buffer size will result in a lower (better) latency. 
	Higher values will be necessary to avoid audio breakup and glitches */
	var bufferSize = 2048;
	var recorder = context.createJavaScriptNode(bufferSize, 2, 2);
 
	recorder.onaudioprocess = function(e){
		console.log ('recording');
		var left = e.inputBuffer.getChannelData (0);
		var right = e.inputBuffer.getChannelData (1);
		/* From googled source: What happens is that the returned channel buffers are pointers to the current samples coming in, 
		so you need to snapshot them (clone) otherwise you will end up with samples reflecting the sound 
		coming from the microphone at the instant you stopped recording.*/
		leftchannel.push (new Float32Array (left));
		rightchannel.push (new Float32Array (right));
		recordingLength += bufferSize;
	}
 
	//connect the recorder
	volume.connect(recorder);
	recorder.connect(context.destination); 
}

var mergeBuffers = function(channelBuffer, recordingLength){
	var result = new Float32Array(recordingLength);
	var offset = 0;
	var lng = channelBuffer.length;
	for (var i = 0; i < lng; i++){
		var buffer = channelBuffer[i];
		result.set(buffer, offset);
		offset += buffer.length;
  	}
  return result;

var interleave = function (leftChannel, rightChannel){
	var length = leftChannel.length + rightChannel.length;
	var result = new Float32Array(length);

	var inputIndex = 0;
	for (var index = 0; index < length; ){
		result[index++] = leftChannel[inputIndex];
		result[index++] = rightChannel[inputIndex];
    	inputIndex++;
  	}	
	return result;
}

var writeUTFBytes = function(view, offset, string){ 
	var lng = string.length;
	for (var i = 0; i < lng; i++){
		view.setUint8(offset + i, string.charCodeAt(i));
	}
}

//flat the left and right channels down
var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
var rightBuffer = mergeBuffers ( rightchannel, recordingLength );

//interleave both channels together
var interleaved = interleave ( leftBuffer, rightBuffer );
 
// create the buffer and view to create the .WAV file
var buffer = new ArrayBuffer(44 + interleaved.length * 2);
var view = new DataView(buffer);
 
// write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
// RIFF chunk descriptor
writeUTFBytes(view, 0, 'RIFF');
view.setUint32(4, 44 + interleaved.length * 2, true);
writeUTFBytes(view, 8, 'WAVE');
// FMT sub-chunk
writeUTFBytes(view, 12, 'fmt ');
view.setUint32(16, 16, true);
view.setUint16(20, 1, true);
// stereo (2 channels)
view.setUint16(22, 2, true);
view.setUint32(24, 44100, true);
view.setUint32(28, 44100 * 4, true);
view.setUint16(32, 4, true);
view.setUint16(34, 16, true);
// data sub-chunk
writeUTFBytes(view, 36, 'data');
view.setUint32(40, interleaved.length * 2, true);
 
// write the PCM samples
var lng = interleaved.length;
var index = 44;
var volume = 1;
for (var i = 0; i < lng; i++){
    view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
    index += 2;
}
 
// final binary blob that we can hand off
var blob = new Blob ( [ view ], { type : 'audio/wav' } );


var recordingDiv = document.getElementById("recording");
var startButton = recordingDiv.children[1].children[0];
var stopButton = recordingDiv.children[1].children[1];

// startButton.addEventListener("click", );
// stopButton.addEventListener("click",)
