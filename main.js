// اول حاجا هعملها اني هنده علي الزراير كلها
let tittle = document.getElementById("tittle");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// هنا هعمل المود الي قلت عليه في سطر 176

let mood = "create";
let tmmp;

// انا هنا طبعتهم كلهم في الكونسول عشان اتاكد انهم شغالين  و كاتب صح
// console.log(
//   tittle,
//   price,
//   taxes,
//   ads,
//   discount,
//   total,
//   count,
//   category,
//   submit
// );

// اول حاجا هحسب التوتال الاحمر الي علي اليمين
// عاوز لما اديلك السعر تحسب عليه الضرايب و الاعلانات و تعمل خصم لو فيه
// انا هاخد كلمه جيت توتاال دي و احطها حدس في الاربع عناصر الي عاوز الفنكشن دي تشتغل عليها
function getTotal() {
  // هنا انا بقلولو لو قيمه السعر لا تسواي فراغ اعمل مخزن حط فيه سعر+ضريه و علانات - الخصم و بعدها بقولو ان التوتال بيسواي المخزن الي فيه العمليه الحسابيه
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    // هنا انا عملت ايلس انو لو مافيش ارقام يفضل زي ما لونو و الكلام يبق فاضي و كمان خلي بالك ان الفنكشن كلها معملوها علي قيمه السعر
    // يعني لو اول خانا الي هي القيمه فيها رقم هيبق اخضر غير كدت لا
    total.innerHTML = "";
    total.style.background = "#e70808";
  }
}

// craet pro
// اسهل مكان ممكن احفظ في الداتا هو الاراي
// اي اوبجكت انا بعملو و اجي اعمل الي بعدو القديم بيتمسح عشان كدا لازم احفظ الاوبجكت دا داخل مصفوفه
let dataPRO;
if (localStorage.pro != null) {
  dataPRO = JSON.parse(localStorage.pro);
} else {
  dataPRO = [];
}

// لما ادوس علي زر السبمت اعمل فنكشن و جواها اعمل اوبجكت و جوه الاوبجكت حط كل حاجا بتسواي القيمه الي جواها
submit.onclick = function () {
  // هجمع بينات المنتج الواحد كلها في اوبجكت عشان الدنيا متخشش في بعض
  // هتكون التايتل بتسواي القيمه الي جواها و نفس الكلام في الباقيي
  let newpro = {
    tittle: tittle.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    // دا مش انبوت دا سمال فمينعش اقولو هات الفاليو انا قت هات الي بداخله من اتشتيامل
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (tittle.value != "" && price.value != "" && category.value != "") {
    //  dataPRO.push(newpro); دا علاشان في اخر الاوبجكت المصفوفه تاخد الاوبجكت كلو عندها
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          dataPRO.push(newpro);
        }
      } else {
        dataPRO.push(newpro);
      }
    } else {
      dataPRO[tmmp] = newpro;
      cleardata();

      //  عشان بعد ما يخلص الزر يرجع كريت تاني و نفس الكلام في الكلمه نفسها علي الزر ترجع و كمان الكونت يظهر تاني
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  } else {
  }

  // دلواقتي انا بينات مش بتروح كدا من الكونسول انما لو عملت ريلود هتروح فهنا لازم اعمل لوكال استوردج و احط في المصفوفه و خلي بالك مش بتقبل غير استرنج فلازم اظبطها
  // لوكال استوردج اول قوس الاسم وتاني قوس البينات الي هتتخزن
  localStorage.setItem("pro", JSON.stringify(dataPRO));

  showdata();
};

// clear data
// انا عملت الفنكشن دي ولاكن ندهت عليها جوه الاون كلك في الاخر عشان يفضي الخانات
function cleardata() {
  tittle.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read:قراه البينات
// طبعا نا عاوز الفنكشن دي تشتغل لما ادوس علي الكريت فهنده عليها هناك
function showdata() {
  getTotal();
  let table = "";
  // اعمل تكرار طول ما المخزن اصغر من المصفوفه الي فيها البينات زود واحد
  for (let i = 0; i < dataPRO.length; i++) {
    table += `
    <tr>
              <td>${i + 1}</td>
              <td>${dataPRO[i].tittle}</td>
              <td>${dataPRO[i].price}</td>
              <td>${dataPRO[i].taxes}</td>
              <td>${dataPRO[i].ads}</td>
              <td>${dataPRO[i].discount}</td>
              <!-- خلي بالك دا رقم التوتال  -->

              <td>${dataPRO[i].total}</td>
              <td>${dataPRO[i].category}</td>
              <td><button onclick='updateData(${i})' id="update">update</button></td>
              <td><button onclick='deletdata(${i})' id="delete">delete</button></td>
            </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteall");
  if (dataPRO.length > 0) {
    btnDelete.innerHTML = `
    <button onclick='deleteall()'>delete  All (${dataPRO.length})</button>

     `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showdata();

// delet one pro
// هطلع فوق في زر المسح و اقولو عند الضغط اعمل الفنكشن دي
// خبي بالك ان الاول بيمسح من المصفوفه بس فنا لازم امسحو كمان من الوكال استوردج عشان الاتنين منفزين علي بعض
function deletdata(i) {
  dataPRO.splice(i, 1);
  localStorage.pro = JSON.stringify(dataPRO);
  // دا الفنكشن المسؤول عن عرض البينات فلازم اشغلو عشان مقعدش اعمل ريولد بعد عمليه المسح
  showdata();
}

function deleteall() {
  localStorage.clear();
  dataPRO.splice(0);
  showdata();
}

// انشاء اي عدد من المتنجات
// tittle.value = dataPRO[i].tittle; ودا علاشان لما ادوس علي زر الابداتي ياخد التايتل الي دست عليه يحطو في التايتل الي فوق
// getTotal() ونا شغلت الفنكشن دي هنا دلواقتي عشان عهي انا عاملها تشتغل لما اكتب حاجا في الانبتس
// count.style.display = "none"; عشان اشيل العدد لما اجي اعدل مش محتاجه
// submit.innerHTML = "Update"; عشان احول زر الكريت الي ابديت

function updateData(i) {
  tittle.value = dataPRO[i].tittle;
  price.value = dataPRO[i].price;
  taxes.value = dataPRO[i].taxes;
  ads.value = dataPRO[i].ads;
  discount.value = dataPRO[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPRO[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// scroll({ عشان لما ادوس علي التحديث يطلع فوق
// behavior: "smooth", عشان لما يجي يطلع ميقطعهاش مره وحدا يبق فيه نعومه

// خلي بالك انت دلواقتي لو دوست علي الزرار بعد دا كلو هيعمل منتج جديد علاشان الزر اصلا مبرمج علي كدا
// فنا لازم اعمل حاجا اسمها الموود ان الزرار يشتغل تحديث في حاله الاتحديث و انشاء في حاله الانشاء
// محتاج اعدل الجزء الي في 73 لان دا الجزء المسؤول عن الانشاء
// انا قلتلو اف الموود === كريت و حطيت الاف بتاعه الانشاء كلها جواها

// search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
    search.Placeholder = "search by title";
  } else {
    searchMood = "category";
    search.Placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPRO.length; i++) {
      if (dataPRO[i].tittle.includes(value.toLowerCase())) {
        table += `
        <tr>
                  <td>${i}</td>
                  <td>${dataPRO[i].tittle}</td>
                  <td>${dataPRO[i].price}</td>
                  <td>${dataPRO[i].taxes}</td>
                  <td>${dataPRO[i].ads}</td>
                  <td>${dataPRO[i].discount}</td>
                  <!-- خلي بالك دا رقم التوتال  -->
    
                  <td>${dataPRO[i].total}</td>
                  <td>${dataPRO[i].category}</td>
                  <td><button onclick='updateData(${i})' id="update">update</button></td>
                  <td><button onclick='deletdata(${i})' id="delete">delete</button></td>
                </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataPRO.length; i++) {
      if (dataPRO[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
                  <td>${i}</td>
                  <td>${dataPRO[i].tittle}</td>
                  <td>${dataPRO[i].price}</td>
                  <td>${dataPRO[i].taxes}</td>
                  <td>${dataPRO[i].ads}</td>
                  <td>${dataPRO[i].discount}</td>
                  <!-- خلي بالك دا رقم التوتال  -->
    
                  <td>${dataPRO[i].total}</td>
                  <td>${dataPRO[i].category}</td>
                  <td><button onclick='updateData(${i})' id="update">update</button></td>
                  <td><button onclick='deletdata(${i})' id="delete">delete</button></td>
                </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean datd  الجزء الي بيخص الانبتس في الادخال
