var song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    NumberleftWristY=Number(leftWristY);
    removedecimal=floor(NumberleftWristY);
    volume=removedecimal/500;
    console.log("leftWristY="+leftWristY);
    document.getElementById("sound").innerHTML="volume: "+volume;
    song.setVolume(volume);
    }
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
console.log("model loaded");
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("leftWristX="+leftWristX+",leftWristY="+leftWristY);
        console.log("rightWristX="+rightWristX+",rightWristY="+rightWristY);
    }
}