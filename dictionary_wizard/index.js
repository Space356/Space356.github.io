var result = "";
var curr_num = 0;
function generate()
{
    result = "";
    curr_num = 0;
    const words = document.getElementById("inpt").value.split(",");
    words.forEach(element => {
        const fetch_string = "https://api.dictionaryapi.dev/api/v2/entries/en/"+element;
        fetch(fetch_string,
            {
              mode: "cors"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                curr_num ++;
                result += String(curr_num)+". "+data[0].word+": <br>";
                for (let i=0;i<data[0].meanings.length;i++)
                {
                    for (let j=0;j<data[0].meanings[i].definitions.length;j++)
                    {
                        result += " * "+data[0].meanings[i].partOfSpeech+" - "+data[0].meanings[i].definitions[j].definition+"<br>     ";
                    }
                }
                result += "<br>";
            });
    });
}

//document.getElementById("result").innerHTML = result;
function disp()
{
    document.getElementById("result").innerHTML = result;
}