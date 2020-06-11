let mergedArrays;

let xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function () {
    
    if(this.readyState === 4 && this.status === 200)
    {
        let objArr1 = JSON.parse(this.responseText);
        
        let xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            
            if(this.readyState === 4 && this.status === 200)
            {
                let objArr2 = JSON.parse(this.responseText);

                mergedArrays = merge((objArr1.personInfo), (objArr2.additionalPersonInfo));
                appendToMyTable(mergedArrays);
            }
        }
        xhttp2.open("GET", "https://api.npoint.io/dc6cb50568fac72a4105", true);
        xhttp2.send();
    }
};
xhttp1.open("GET", "https://api.npoint.io/177cea9c157de479d51b", true);
xhttp1.send();

function merge(arr1, arr2)
{
    let res = [];
    for(let i=0; i<arr1.length; i++)
    {
        for(let j=0; j<arr2.length; j++)
        {
            if(arr1[i].uid===arr2[j].uid)
            {
                res.push(Object.assign({},arr1[i],arr2[j]));
            }
        }
    }

    return res;
}

let select;
let newTr;
let newTd;
function appendToMyTable(arr) //Append to Table Method
{
    select = document.getElementById("myTable");
    select.innerHTML = "";
    select.innerHTML = "<tr> <th>UID</th>  <th>FirstName</th>  <th>LastName</th>  <th>PhoneNumber</th>  <th>Position</th>  <th>PostalCode</th>  <th>City</th> </tr>"
    for(let i=0; i<arr.length; i++)
    {
        newTr = document.createElement("tr");
        newTr.setAttribute("onclick",`showInfo("${arr[i].uid}")`);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].uid;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].firstName;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].lastName;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].phoneNumber;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].position;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].postalCode;
        newTr.appendChild(newTd);

        newTd = document.createElement("td");
        newTd.innerHTML = arr[i].city;
        newTr.appendChild(newTd);

        select.appendChild(newTr);
    }
}

let createdSubmitButtons = false;

let newText;
let newP;
let currentUid;
function showInfo(inputUid) {

    currentUid = inputUid;

    for(let i=0; i<mergedArrays.length; i++)
    {
        if(mergedArrays[i].uid === inputUid)
        {
            document.getElementById("myPanel").style.display = "block";
            document.getElementById("create1").style.display = "none";

            select = document.getElementById("inputs");
            select.innerHTML = "";
            
            newP = document.createElement("p");
            newText = document.createTextNode("FirstName = "+mergedArrays[i].firstName);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("LastName = "+mergedArrays[i].lastName);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("UID = "+mergedArrays[i].uid);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("PostalCode = "+mergedArrays[i].postalCode);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("Position = "+mergedArrays[i].position);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("PhoneNumber = "+mergedArrays[i].phoneNumber);
            newP.appendChild(newText)
            select.appendChild(newP);

            newP = document.createElement("p");
            newText = document.createTextNode("City = "+mergedArrays[i].city);
            newP.appendChild(newText)
            select.appendChild(newP);
        }
    }
}

$(document).ready(function () {

    $("#update").click(function () {
        $("#inputs").html("");
        $("#change-buttons").html(`<button class="save" id="save-update">SaveUpdate</button>  <button class="cancel" id="cancel-update">CancelUpdate</button>`);

        $("#save-update").click(function () {
            
            for(let j=0; j<mergedArrays.length; j++)
            {
                if(currentUid === mergedArrays[j].uid)
                {
                    mergedArrays[j].firstName = ( $("#fName").val() );
                    mergedArrays[j].lastName = ( $("#lName").val() );
                    mergedArrays[j].uid = ( $("#uid").val() );
                    mergedArrays[j].postalCode = ( $("#pCode").val() );
                    mergedArrays[j].position = ( $("#pos").val() );
                    mergedArrays[j].phoneNumber = ( $("#phone").val() );
                    mergedArrays[j].city = ( $("#city").val() );
                    currentUid = ( $("#uid").val() );
                }
            }
            appendToMyTable(mergedArrays);
            showInfo(currentUid)
            $("#change-buttons").html("");
            console.log(mergedArrays);
        });

        $("#cancel-update").click(function () {
            showInfo(currentUid);
            $("#change-buttons").html("");
            $("#inputs").html("");
        });

        for(let i=0; i<mergedArrays.length; i++)
        {
            if(currentUid === mergedArrays[i].uid)
            {
                $("#inputs").append(`<label for="fName">FirstName: <input id="fName" type="text" value="${mergedArrays[i].firstName}"> </label>`);
                $("#inputs").append(`<label for="lName">LastName: <input id="lName" type="text" value="${mergedArrays[i].lastName}"> </label>`);
                $("#inputs").append(`<label for="uid">UID: <input id="uid" type="text" value="${mergedArrays[i].uid}"> </label>`);
                $("#inputs").append(`<label for="pCode">PostalCode: <input id="pCode" type="text" value="${mergedArrays[i].postalCode}"> </label>`);
                $("#inputs").append(`<label for="pos">Position: <input id="pos" type="text" value="${mergedArrays[i].position}"> </label>`);
                $("#inputs").append(`<label for="phone">PhoneNumber: <input id="phone" type="text" value="${mergedArrays[i].phoneNumber}"> </label>`);
                $("#inputs").append(`<label for="city">City: <input id="city" type="text" value="${mergedArrays[i].city}"> </label>`);
            }
        }
    });

    $("#delete").click(function () {
        $("#change-buttons").html(`<button class="save" id="save-delete">SaveDelete</button>  <button class="cancel" id="cancel-delete">CancelDelete</button>`);
        showInfo(currentUid);

        $("#save-delete").click(function () {
            for(let i=0; i<mergedArrays.length; i++)
            {
                if(currentUid === mergedArrays[i].uid)
                {
                    mergedArrays.splice(i,1);
                    appendToMyTable(mergedArrays);
                    $("#inputs").html("");
                    $("#change-buttons").html("");
                }
            }
            console.log(mergedArrays);
        });

        $("#cancel").click(function () {
            $("#change-buttons").html("");
        });
    });

    $("#create, #create1").click(function () {
        $("#myPanel").css("display","block");
        $("#change-buttons").html("");
        $("#change-buttons").html(`<button class="save" id="createPerson">CreatePerson</button>  <button class="cancel" id="cancelCreate">CancelCreatePerson</button>`);

        $("#inputs").html("");

        $("#inputs").append(`<label for="fName">FirstName: <input id="fName" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="lName">LastName: <input id="lName" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="uid">UID: <input id="uid" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="pCode">PostalCode: <input id="pCode" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="pos">Position: <input id="pos" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="phone">PhoneNumber: <input id="phone" type="text" value=""> </label>`);
        $("#inputs").append(`<label for="city">City: <input id="city" type="text" value=""> </label>`);

        function newPerson(esm, famili, id, postal, makan, shomare, shahr) //create constractor fo new person
        {
            this.firstName = esm;
            this.lastName = famili;
            this.uid = id;
            this.postalCode = postal;
            this.position = makan;
            this.phoneNumber = shomare;
            this.city = shahr;
        }

        $("#createPerson").click(function () {
            let myObjNewPerson = new newPerson( $("#fName").val(), $("#lName").val(), $("#uid").val(), $("#pCode").val(), $("#pos").val(), $("#phone").val(), $("#city").val(), );
            mergedArrays.push(myObjNewPerson);
            appendToMyTable(mergedArrays);
            $("#inputs").html("");
            $("#change-buttons").html("");
            console.log(mergedArrays);
        });

        $("#cancelCreate").click(function () {
            $("#inputs").html("");
            $("#change-buttons").html("");
        });
    });

    $("#read").click(function () {
        $("#inputs").html("");

        $("#change-buttons").html("");
        $("#change-buttons").html(`<button class="save" id="readInfo">ReadThisIdInfo</button>  <button class="cancel" id="cancelRead">Don't Read</button>`);

        $("#inputs").append(`<label for="uid">Person ID: <input id="uid" type="text" value=""> </label>`);

        $("#readInfo").click(function () {
            currentUid = $("#uid").val();
            showInfo(currentUid);
            $("#change-buttons").html("");
        });

        $("#cancelRead").click(function () {
            $("#inputs").html("");
            $("#change-buttons").html("");
        });
    });

    $(".close").click(function () {
        $("#myPanel").css("display","none");
        $("#create1").css("display","block");
    })
});