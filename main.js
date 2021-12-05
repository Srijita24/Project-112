prediction = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version : ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oA7ADopuB/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded !');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        speak();
        prediction = results[0].label;
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        if (results[0].label == "Amazing") {         
            
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "Best") {
            prediction = "All The Best!";
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Victory") {
            prediction = "This Is A Marvelous Victory!";
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "This Emoji Means" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}