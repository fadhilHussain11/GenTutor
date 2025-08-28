const topics = [
            "Introduction to Thermodynamics",
            "Laws of Thermodynamics",
            "Enthalpy and Heat Transfer",
            "Entropy and Spontaneity",
            "Gibbs Free Energy",
            "Thermodynamic Equilibrium",
            "Applications in Chemical Reactions"
        ];
// Get subject and unit from URL
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject') || 'Chemistry';
const unit = urlParams.get('unit') || 'Thermodynamics';

// Display subject info
document.getElementById('subject-display').textContent = `${subject}: ${unit}`;

        // Load topics
const topicsContainer = document.getElementById('topics-list');
let selectedTopic = null;

topics.forEach((topic, index) => {
    const topicBtn = document.createElement('button');
    topicBtn.className = 'topic-item';
    topicBtn.innerHTML = `${index + 1}. ${topic}`;
    topicBtn.onclick = function() {
    // Remove selected class from all topics
        document.querySelectorAll('.topic-item').forEach(item => {
            item.classList.remove('selected');
        });
     // Add selected class to clicked topic
        this.classList.add('selected');
        selectedTopic = topic;
        document.getElementById('continue-btn').disabled = false;
    };
    topicsContainer.appendChild(topicBtn);
 });

// Handle continue button
document.getElementById('continue-btn').addEventListener('click', function() {
    if (selectedTopic) {
         window.location.href = `/content?subject=${encodeURIComponent(subject)}&unit=${encodeURIComponent(unit)}&topic=${encodeURIComponent(selectedTopic)}`;
        }
     });





// from flask import Flask, render_template, request

// app = Flask(__name__)

// @app.route('/topics')
// def topics():
//     subject = request.args.get('subject', 'Chemistry')
//     unit = request.args.get('unit', 'Thermodynamics')
//     return render_template('topics.html')

// @app.route('/content')
// def content():
//     subject = request.args.get('subject', 'Chemistry')
//     unit = request.args.get('unit', 'Thermodynamics')
//     topic = request.args.get('topic', 'Introduction')
//     return render_template('content.html', subject=subject, unit=unit, topic=topic)

// if __name__ == '__main__':
//     app.run(debug=True)



// ith koodium cheytahalle work avuulu , anneram cheyya 
// content 3 baakyund topics enter cheythaal kittunna page ippo akknilla , in sha ALLAH pinne cheyya