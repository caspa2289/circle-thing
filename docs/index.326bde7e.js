!function(){class t{//FIXME: добавить возможность настраивать вещи налету
constructor({debug:e}){if(t._instance)return t._instance;t._instance=this,this.particleRadius=20,this.gravity=9.8,this.precalc={radiusFactor:this.particleRadius/(this.particleRadius+this.particleRadius),circleAngle:2*Math.PI},this.timeSpeedCoefficient=30,this.targetFrameTime=1e3/60,this.friction=.9,this.debug=!!e}}class e{static new(t,e){return{x:t??0,y:e??0}}static multiplyScalar({x:t,y:e},i){return{x:t*i,y:e*i}}static add(t,e){return{x:t.x+e.x,y:t.y+e.y}}static subtract(t,e){return{x:t.x-e.x,y:t.y-e.y}}static dot(t,e){return t.x*e.x+t.y*e.y}static magnitude({x:t,y:e}){return Math.sqrt(t*t+e*e)}static normalize({x:t,y:i}){let a=e.magnitude({x:t,y:i});return{x:t/a,y:i/a}}static collisionNormal(t,i){return e.normalize(e.subtract(t,i))}static reflectFromPoint(t,i,a){let s=e.collisionNormal(t,i);return e.subtract(a,e.multiplyScalar(s,2*e.dot(a,s)))}static reflectFromNormal(t,i){// v' = v - 2 * (v ∙ n/n ∙ n) * n
return e.subtract(t,e.multiplyScalar(i,2*e.dot(t,i)/e.dot(i,i)))}}class i{constructor(){if(this.addParticle=(t,i,a,s,r)=>{this.particles.push({position:e.new(t,i),velocity:e.new(a,s),relativeVelocity:e.new(0,0),color:r})},//TODO: add possibility to create diagonal obstacles
this.addObstacle=(t,e,i,a)=>{this.obstacles.push({data:[t,e,i,a]})},i._instance)return i._instance;i._instance=this,this.particles=[],this.obstacles=[]}}class a{static prepareFrame(t,e,i){for(let s=0;s<t.particles.length;s++){let{position:r,velocity:l,relativeVelocity:c}=this._resolveParticleCollisions(s,t,e,i),n={x:r.x+c.x,y:r.y+c.y},o={x:l.x,y:l.y+e.gravity},h=a.getRelativeVelocity(o,i);t.particles[s]={...t.particles[s],position:n,velocity:o,relativeVelocity:h}}}static _resolveParticleCollisions(t,i,s,r){let{position:l,velocity:c,relativeVelocity:n,color:o}=i.particles[t],[h,d,p]=[l,c,n];for(let t=0;t<i.obstacles.length;t++){let{data:[l,c,n,o]}=i.obstacles[t],y=()=>{let t=n/2,i=o/2,a=Math.abs(l+t),r=Math.abs(c+i),d=e.new(Math.abs(h.x-a),Math.abs(h.y-r));if(d.x>t+s.particleRadius||d.y>i+s.particleRadius)return!1;if(d.x<=t||d.y<=i)return!0;let p=(d.x-t)*2+(d.y-i)*2;return p<=2*s.particleRadius};if(y()){let t=l+n,i=c+o,y=e.new(h.x<l?l:h.x>t?t:h.x,h.y<c?c:h.y>i?i:h.y),u=Math.sqrt(Math.pow(y.x-h.x,2)+Math.pow(y.y-h.y,2)),m=s.particleRadius-u;if(m>0){//if particle intersects obstacle, move particle away
let t=(h.x-y.x)/u,i=(h.y-y.y)/u;h=e.new(h.x+t*m,h.y+i*m)}let x=a.applyFriction(e.reflectFromPoint(y,h,d),s);d=x,p=a.getRelativeVelocity(x,r)}}for(let l=0;l<i.particles.length;l++){if(l<=t)continue;let{position:n,velocity:o}=i.particles[l],y=n.x-h.x,u=n.y-h.y,m=Math.sqrt(y*y+u*u);if(m<2*s.particleRadius){//if collided, find collision point
let t=e.add(e.multiplyScalar(h,s.precalc.radiusFactor),e.multiplyScalar(n,s.precalc.radiusFactor)),x=a.applyFriction(e.reflectFromPoint(t,n,c),s),w=a.applyFriction(e.reflectFromPoint(t,h,o),s),g=s.particleRadius+s.particleRadius-m;if(g>0){//if they intersect, move them apart evenly
let t=y/m,a=u/m;h=e.new(h.x-t*g/2,h.y-a*g/2);let s=e.new(n.x+t*g/2,n.y+a*g/2);i.particles[l]={...i.particles[l],position:s}}d=x,p=a.getRelativeVelocity(x,r),i.particles[l]={...i.particles[l],velocity:w,relativeVelocity:a.getRelativeVelocity(w,r)}}}return{position:h,velocity:d,relativeVelocity:p,color:o}}static applyFriction(t,i){return e.multiplyScalar(t,i.friction)}//FIXME: надо будет убрать в отдельный класс когда будут другие утилиты для физики
static getRelativeVelocity(t,e){//FIXME: изменение дельта тайма меняет результат симуляции, надо решать с интерполяцией что-то
return{x:t.x/e.deltaTime,y:t.y/e.deltaTime}}}class s{static drawFrame(t,e,i){t.context.clearRect(0,0,t.canvas.width,t.canvas.height),i.particles.forEach(({position:i,color:a})=>{t.context.beginPath(),t.context.fillStyle=a,t.context.arc(i.x,i.y,e.particleRadius,0,e.precalc.circleAngle),t.context.fill()}),this._drawObstacles(t,i.obstacles)}static _drawObstacles(t,e){e.forEach(({data:e})=>{t.context.fillRect(...e)})}}class r{constructor(t,e){if(r._instance)return r._instance;r._instance=this,this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d"),this.dpr=window.devicePixelRatio||1,this.rawDeltaTime=performance.now(),this.lastFrameTime=this.rawDeltaTime,this.isPaused=!1,this.options=t,this.entityManager=e,this.update=this.update.bind(this),this.onPause=this.onPause.bind(this)}init(){this.canvas.width=document.body.clientWidth*this.dpr,this.canvas.height=document.body.clientHeight*this.dpr,this.options.debug?window.addEventListener("click",()=>{this.rawDeltaTime=1,this.lastFrameTime=1,a.prepareFrame(this.entityManager,this.options,this),s.drawFrame(this,this.options,this.entityManager)}):(window.addEventListener("click",this.onPause),window.requestAnimationFrame(this.update))}update(t){this.rawDeltaTime=(t-this.lastFrameTime)/this.options.targetFrameTime,this.lastFrameTime=t,window.requestAnimationFrame(this.update),this.isPaused||(a.prepareFrame(this.entityManager,this.options,this),s.drawFrame(this,this.options,this.entityManager))}onPause(){this.isPaused=!this.isPaused}get deltaTime(){return this.rawDeltaTime*this.options.timeSpeedCoefficient}}let l=["red","green","blue","orange","pink"],c=new t({debug:!1}),n=new i;for(let t=0;t<=9;t++){let e=45*(t+1),i=60*(t+1);n.addParticle(e,i,t,0,l[Math.floor(5*Math.random())])}// entityManager.addParticle(60, 60, 90, 0)
// entityManager.addParticle(300, 60, -80, 0)
// entityManager.addParticle(150, 60, 90, 0)
// entityManager.addParticle(250, 60, -80, 0)
n.addObstacle(0,800,510,20),n.addObstacle(0,0,20,800),n.addObstacle(490,0,20,800),n.addObstacle(0,0,500,20);let o=new r(c,n);o.init()}();//# sourceMappingURL=index.326bde7e.js.map

//# sourceMappingURL=index.326bde7e.js.map