

//----------------------------
//
// 	      MODULE
//
//-----------------------
//
//
var ParticleSystem = (function () {
	//
	//
	// MEMBERS
	//
	var _clusters;
  	var _canvas;
  	var _time;
  	var _msDelay;
  	var _presets = {};
  	//
  	var psCtx;
  	var dt;
	//
	
	//
	//
	// METHODS
	//
	var draw = function() 
	{
		var now = new Date().getTime();
		dt = now - (_time || now);
    	_time = now;

    	/*
		psCtx.globalCompositeOperation = "source-over";
		psCtx.fillStyle = "rgba(0, 0, 0, 1.0)";
		psCtx.fillRect(0, 0, 800, 600);
		//psCtx.globalCompositeOperation = "lighter";
		*/

		for(var i=0; i < _clusters.length; i++) {
			_clusters[i].draw();
		}
	};
	//
	var add = function(x_, y_, settings_, presetId_) 
	{
		if(typeof presetId_ !== 'undefined') {
			settings_ = typeof settings_ === 'undefined' ? _presets[presetId_] : Da.Merge(settings_, _presets[presetId_]);
		}
		var pSys = new Cluster().init(this, x_, y_, settings_);
		_clusters.push(pSys);
		return pSys;
	}; 
	var remove = function(pSys_) 
	{
		_clusters.splice(_clusters.indexOf(pSys_), 1);
	};
	//
	//
	var init = function(canvas_, msDelay_) 
	{
		_canvas = canvas_;
		_msDelay = msDelay_;
		//
		psCtx = _canvas.getContext("2d");
		_clusters = [];
	};
	var addPreset = function(id_, preset_)
	{
		_presets[id_] = preset_;
	};





//----------------------------
//
// 	   SIMPLE TOOLS
//
//-----------------------
//
//
function Da() { } 
Da.Clamp = function(value_, min_, max_) { return Math.min(Math.max(value_, min_), max_); };
Da.RGBA = function(rgb_, alpha_) { return "rgba("+rgb_[0]+", "+rgb_[1]+", "+rgb_[2]+", "+alpha_+")"; };
Da.Merge = function(cfgA_, cfgB_) 
{
	for(var key in cfgB_) {
		if(!( key in cfgA_ )) {
			cfgA_[key] = cfgB_[key];
		}
	}
	return cfgA_;
};


//--------------------------------------------
//
// 	particlesystem / cluster / PARTICLE
//
//---------------------------------------
//
//
function Particle() 
{
	this.cluster;
	this.alive = false;
	//
	this.radius;
	//
	this.x = 0;
	this.y = 0;	
	//
	this.vx;
	this.vy;
	this.alpha;
	this.minAlpha;
	this.maxAlpha;
	this.alphaStep;
	this.scale = 1.0;
	this.minScale;
	this.maxScale;
	this.scaleStep;
	//
	this.color = [0.0, 0.0, 0.0];
	this.rgba;
	//
	return this;	
} Particle.prototype.init = function(cluster_, first_) {
	//
	this.cluster = cluster_;
	if(first_) return this;
	//
	this.radius = this.cluster.getRadius();
	this.color = this.cluster.getColor();
	//
	var spawnPos = this.cluster.getSpawnPos();
	this.x = spawnPos[0];
	this.y = spawnPos[1];
	
	// Random velocity
	var vxRange = this.cluster.settings['vxRange'];
	var vyRange = this.cluster.settings['vyRange'];
	this.vx = Math.random() * (vxRange[1]-vxRange[0]) + vxRange[0];
	this.vy = Math.random() * (vyRange[1]-vyRange[0]) + vyRange[0];
	// Alpha
	this.alpha = this.cluster.settings['alpha'];
	if(this.cluster.settings['alphaRange'] != null) {
		this.alpha = this.cluster.settings['alphaRange'][0];
		this.minAlpha = Math.min(this.cluster.settings['alphaRange'][0], this.cluster.settings['alphaRange'][1]);
		this.maxAlpha = Math.max(this.cluster.settings['alphaRange'][0], this.cluster.settings['alphaRange'][1]);
		this.alphaStep = this.cluster.settings['alphaRange'][2];
	}	
	// Scale
	if(this.cluster.settings['scaleRange'] != null) {
		this.scale = this.cluster.settings['scaleRange'][0];
		this.minScale = Math.min(this.cluster.settings['scaleRange'][0], this.cluster.settings['scaleRange'][1]);
		this.maxScale = Math.max(this.cluster.settings['scaleRange'][0], this.cluster.settings['scaleRange'][1]);
		this.scaleStep = this.cluster.settings['scaleRange'][2];
	}
	// Color
	this.rgba = Da.RGBA(this.color, + this.alpha);
	//
	this.alive = true;
	//
	return this;
};


Particle.prototype.gradient = function()
{
	var cfg = this.cluster.settings['gradient'];
	//
	if(cfg == null) {
		return this.rgba;
	}
	//
	var gradient = this.cluster.system.getCtx().createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius*this.scale);
	for(var i=0; i < cfg.length; i++) {
		var col = cfg[i]['color'] != null ? Da.RGBA(cfg[i]['color'], + cfg[i]['alpha']*this.alpha) : this.rgba;
		gradient.addColorStop(cfg[i]['pos'], col);	
	}
	//
	return gradient;
};


Particle.prototype.draw = function()
{
	if(!this.alive) {
		if(Math.random() > this.cluster.settings['spawnChance']) return;
		//
		this.init(this.cluster, false);
	}
	//
	var psCtx = this.cluster.system.getCtx();
	psCtx.beginPath();

	psCtx.fillStyle = this.gradient();
	psCtx.arc(this.x, this.y, this.radius*this.scale, Math.PI*2, false);
	psCtx.fill();
	//
	// Update
	var dt = this.cluster.system.getDeltatime();
	// Movement
	this.x += this.vx * dt;
	this.y += this.vy * dt;
	if(this.cluster.settings['bounds'] != null) {
		if( this.x < this.cluster.settings['bounds'][0][0] 
		 || this.y < this.cluster.settings['bounds'][0][1]
		 || this.x > this.cluster.settings['bounds'][1][0]
		 || this.y > this.cluster.settings['bounds'][1][1] ) {
			this.alive = false;
		}
	}
	// Alpha
	if(this.cluster.settings['alphaRange'] != null) {
		this.alpha += this.alphaStep;
		this.alpha = Da.Clamp(this.alpha, this.minAlpha, this.maxAlpha);
		this.rgba = Da.RGBA(this.color, this.alpha);
		if(this.alpha == this.minAlpha || this.alpha == this.maxAlpha) {
			if(this.cluster.settings['alphaLoop']) {
				if(!this.cluster.settings['endByAlpha'] || this.alphaStep == this.cluster.settings['alphaRange'][2]) {
					this.alphaStep *= -1;
				} else {
					this.alive = false;
				}
			} 
		}
	}
	// Scale
	if(this.cluster.settings['scaleRange'] != null) {
		this.scale += this.cluster.settings['scaleRange'][2];
		this.scale = Da.Clamp(this.scale, this.minScale, this.maxScale);
		if(this.scale == this.minScale || this.scale == this.maxScale) {
			if(this.cluster.settings['scaleLoop']) {
				if(!this.cluster.settings['endByScale'] || this.scaleStep == this.cluster.settings['scaleRange'][2]) {
					this.scaleStep *= -1;
				} else {
					this.alive = false;
				}
			} 
		}
	}

};



//--------------------------------------------
//
// 	particlesystem / CLUSTER
//
//---------------------------------------
//
//
function Cluster() 
{
	this.system;
	this.x;
	this.y;
	//
	this.particles;
	//
	return this;	
} Cluster.prototype.init = function(system_, x_, y_, settings_) {
	this.system = system_;
	this.x = x_;
	this.y = y_;
	//
	settings_ = typeof settings_ === 'undefined' ? {} : settings_;
	this.settings = Da.Merge(settings_, Cluster.DefaultSettings);
	//
	var aliveCtr = this.settings['startAmount'];
	this.particles = [];
	for(var i=0; i < this.settings['maxAmount']; i++) {
		this.particles.push(new Particle().init( this, (i < aliveCtr ? false : true) ));
	}
	//
	return this;
};


Cluster.DefaultSettings = {
	'color': [255,255,255],
	'startAmount': 0,
	'maxAmount': 10,
	'spawnChance': 1.0,
	'fixedRadius': null,
	'minRadius': 1,
	'maxRadius': 8,
	'scatter': [0,0],
	'vxRange': [-10,10],
	'vyRange': [-10,10],
	'bounds': null,
	'alpha': 1.0,
	'alphaRange': null,
	'alphaLoop': false,
	'endByAlpha': false,
	'scaleRange': null,
	'scaleLoop': false,
	'endByScale': false,
	'gradient': [
		{ 
			'pos': 0.0,
			'color': [255,255,255],
			'alpha': 1.0
		},
		{ 
			'pos': 0.4,
			'color': [255,255,255],
			'alpha': 1.0
		},
		{ 
			'pos': 0.4,
			'color': null,
			'alpha': 1.0
		},
		{ 
			'pos': 1.0,
			'color': [0,0,0],
			'alpha': 0.0
		},

	],


};



Cluster.prototype.draw = function()
{
	for(var i=0; i < this.particles.length; i++) {
		this.particles[i].draw();
	}
};


Cluster.prototype.getSpawnPos = function() 
{
	var sx = this.settings['scatter'][0];
	var sy = this.settings['scatter'][1];
	return [
		this.x + (sx == 0 ? 0 : Math.random()*sx - sx/2),
		this.y + (sy == 0 ? 0 : Math.random()*sy - sy/2)
	];
};


Cluster.prototype.getRadius = function() 
{
	if(this.settings['fixedRadius'] != null) {
		return this.settings['fixedRadius'];
	}
	//
	return (Math.random()*(this.settings['maxRadius']-this.settings['minRadius']) + this.settings['minRadius']) >> 0;
};

Cluster.prototype.getColor = function() 
{
	if(this.settings['color'] != null) {
		return this.settings['color'];
	}
	var r = Math.random()*255 >> 0;
	var g = Math.random()*255 >> 0;
	var b = Math.random()*255 >> 0;
	return [r,g,b];
};




	
  	//----------------------------
	//
	// 	 MODULE INTERFACE
	//
	//-----------------------
	//
	//
	return {
	  	draw: draw,
	  	add: add,
	  	remove: remove,
	  	init: init,
	  	addPreset: addPreset,
	  	//
	  	getCtx: function() { return psCtx; },
	  	getDeltatime: function() { return dt / _msDelay; },
	};

})();






ParticleSystem.addPreset("wind", {
	'maxAmount': 5,
	'minRadius': 1,
	'maxRadius': 4,
	'alphaRange': [0.0, 1.0, 0.1], 
	'alphaLoop': true,
	'endByAlpha': true, 
	'spawnChance': 0.1,
	'bounds': [
		[0,0],
		[800,600]
	],
	'color': [255,255,255],
	'scatter': [30,30],
	'vxRange': [0,0],
	'vyRange': [1,3],
});