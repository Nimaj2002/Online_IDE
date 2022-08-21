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
        'code': code,
        'input': inp,
        'language': language,
    };

    output.setValue("runnig...");
    
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/IDE/",
        data: datas,
        // data: JSON.stringify(datas),
        ContentType: 'application/json',
        success: function(data) {
            output.setValue(data.result);
        }
    });

}
