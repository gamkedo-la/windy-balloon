// SOUND SYSTEM MODULE
// made by Christer "McFunkypants" Kaitila for http://gamkedo.com
// Requires https://github.com/goldfire/howler.js

// how to use in-game: 

// soundSystem.play("soundname");
// will optionally download or play a cached version of "audio/soundname.mp3" or ogg or webm

// soundSystem.mute(true);
// set global sound mute on or off

"use strict";

var soundSystem = new soundSystemClass();

function soundSystemClass() {

	// private variable - no need to access from game code
	var sounds = []; // an array of Howl() objects
	var isMuted = false; // boolean state
	var debug_sound = true; // write to console?

	this.play = function(samplename,looping,vol) {
		
		if (looping==null) looping = false;
		if (vol==null) vol = 1;

		if (!sounds[samplename]) // downloads on demand once only
		{
			// src array is filenames to try in what order
			// every new browser supports .webm, 
			// older ones like mp3 or ogg but not both
			sounds[samplename] = new Howl({
				src: [
					'audio/'+samplename+'.mp3',
					'audio/'+samplename+'.ogg',
					'audio/'+samplename+'.webm'],
				loop: looping,
				volume: vol
			});
		}
		
		if (debug_sound) console.log("soundSystem.play "+samplename);
		sounds[samplename].play();
	}
	
	this.mute = function(on_or_off) {
		if (debug_sound) console.log("soundSystem.mute "+on_or_off);
		Howler.mute(on_or_off);
		isMuted = on_or_off;
	}
	
	this.toggleMute = function() {
		if (debug_sound) console.log("toggleMute");
		Howler.mute(!isMuted);
	}

};

