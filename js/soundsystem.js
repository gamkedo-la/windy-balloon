// SOUND SYSTEM MODULE
// by Christer "McFunkypants" Kaitila for http://gamkedo.com

// Requires https://github.com/goldfire/howler.js

"use strict";

var isMuted = false; 
var music = null;	// one looping Howl() object
var sounds = [];	// an array of Howl() objects


function soundSystem (mute) {

	var play = function(samplename,looping,vol) 
	{
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
		
		sounds[samplename].play();
	}
	
	var init = function(){
		console.log(currentLevelIdx)
		if(currentLevelIdx===1 || currentLevelIdx==3){
		play("City",true,0.25); // looping
		}
		else {
		play("music",true,0.5); // looping quite music	
		}
		
		//if(cureTemp == cureVialMaxTemp){
		//play("Alarm",false,0.5); // not loop	
	//	}
		// test voiceover intro
		//play("Wendy_B_Loon_Intro_Cinematic_VO"); // once only
	}
	
	init();
	
};

