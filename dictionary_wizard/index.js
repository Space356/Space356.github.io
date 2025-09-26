var result = "";
var curr_num = 0;
async function generate()
{
    result = "";
    curr_num = 0;
    result += "<ol>";
    const words = document.getElementById("inpt").value.split(",");
    for (const element of words)
    {
        const fetch_string = "https://api.dictionaryapi.dev/api/v2/entries/en/"+element;
        const response = await fetch(fetch_string,{mode: "cors"})
        const data = await response.json();

        console.log(data[0]);
        curr_num ++;
        result += "<li>"+data[0].word+": <ul>";
        for (let i=0;i<data[0].meanings.length;i++)
        {
            for (let j=0;j<data[0].meanings[i].definitions.length;j++)
            {
                result += "<li>"+data[0].meanings[i].partOfSpeech+" - "+data[0].meanings[i].definitions[j].definition+"</li>     ";
            }
        }
        result += "</ul></li>";

        //await Promise.all(promises);
    }
}

//document.getElementById("result").innerHTML = result;
function disp()
{
    result += "</ol>";
    document.getElementById("result").innerHTML = result;
    result = "Sorry, I need to figure some stuff out.";
}