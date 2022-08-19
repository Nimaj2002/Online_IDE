function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


let editor;
let input;
let output;

window.onload = function() {
    // Editor initialization
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/python"); 
    editor.insert("# Your Code here");

    // Input initialization
    input = ace.edit("input");
    input.setTheme("ace/theme/monokai");
    input.session.setMode("ace/mode/text");
    input.insert("Input: Dont forget to delete this :)");

    // Output initialization
    output = ace.edit("output");
    output.setTheme("ace/theme/monokai");
    output.insert("Output:\n");
    output.setReadOnly(true);
}

function changeLanguage() {

    let language = $("#languages").val();

    if(language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'python')editor.session.setMode("ace/mode/python");
}

function runCode() {
    let code = editor.getValue();
    let inp = input.getValue();
    let language = $("#languages").val();
    let datas = {
        "code": code,
        "input": inp,
        "language": language,
    };

    $.ajax({
        type: "POST",
        url: "",
        data: JSON.stringify(datas),
        contentType: "application/json",
        success: function(data) {
            output.setValue(data);
        }
    });

    // $.ajax({
    //     type: "POST",
    //     url: "",
    //     data: datas,
    //     success: success,
    //     dataType: dataType
    //   });

}
