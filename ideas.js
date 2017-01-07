//JS
const sum = function (a, b) {
  return a + b;
};

//BS
sum < (/a + /b)
//or
(/a + /b) > sum

//-----------------

//JS
const arraySum = function (arr) {
  return arr.reduce((c,p) => c+p)
};

//BS
arraySum < (reduce /< (/c+/p) : /arr)

//-----------------

//JS
var obj = {
  animal:{
    human: {
      men:{
        vasya (a,b,c) {
          return 123 + a + b + c;
        }
      }
    }
  }
};

const callVasya = function (a, b,c) {
  return obj.animal.human.man.vasya(a,b,c);
};


//BS
obj < [
  animal < [
    human < [
      men < [
        vasya < (123 + /a + /b + /c)
      ]
    ]
  ]
]

callVasya < (
  vasya /< [1,2,3] : men human animal obj >> result
  //or
  result << vasya /< [1,2,3] : men human animal obj
  = result
  //or
  = << vasya /< [1,2,3] : men human animal obj
)
//or
callVasya < (vasya /< [1,2,3] : men human animal obj)


//-----------------

//JS
function globUsage (str) {
  setTimeout(() => {
    console.log(str);
    console.info('Done');
  }, 50);

  let index = setInteval(() => {
    alert('it\'s happens');
  }, 100);

  clearInterval(index);

  return true
}

//BS
globUsage < (
  log, info : console window
  //shitHappens < error : console window //alias for method

  setTimeout /< (
    /str > log >>
    log < 'Done' >>
  ), 50 : window >>

  //or another approach
  (alert /< 'it\'s happens' : window), 100 >/ setInteval : window >> index

  clearInterval /< index : window
  //or
  (alert /< 'it\'s happens' : window) >/ setInteval /< 100 : window >>/ clearInterval

  = true
)

//-----------------

//This case and .call, .apply, .bind

//-----------------


//-----------------
//-----------------
//-----------------
//Outdated:

showInlineMessage ({ id, type, timeout, message, classes = {}, watch, debugMsg, cb }, vueApp) {
  if (debugMsg) innerMethods.showInConsole(debugMsg, type, TYPE)
  const elem = document.getElementById(id)

  if (watch) {
    timeout = false
    if (watch && watch()) innerMethods.showInlineFn(elem, message, classes)
    // const interval = setInterval(() => {
    let prev
    let cur

    // TODO (S.Panfilov)make sure no memory leak here, destroy interval when we're leave page
    setInterval(() => {
      if (watch) {
        cur = watch()
        // clearInterval(interval)
        if (cur !== prev) {
          if (cur) innerMethods.showInlineFn.call(innerMethods, elem, message, classes)
          if (!cur) innerMethods.clearInlineFn.call(innerMethods, elem, classes)
          prev = cur
        }
      }
    }, 50)
  }

  showInlineMessage: id, type, timeout, message, classes = {}, watch, debugMsg, cb, vueApp
  + debugMsg => (showInConsole < debugMsg, type, TYPE) > innerMethods
  elem: <  getElementById < id ^

  + watch
  false > timeout
  + watch and watch<
.showInlineFn < elem, message, classes > innerMethods
  //(elem, message, classes) > showInlineFn > innerMethods
  //innerMethods < showInlineFn < (elem, message, classes)
  prev:, cur:

    (
      + watch
  watch(<)>cur
  + cur is not prev
  + cur
  innerMethods<showInlineFn<call < innerMethods, elem, message, classes
  - cur
  innerMethods<showInlineFn<call < innerMethods, elem, message, classes
  cur > prev
) > setInterval < 50
    =


    myUtilsObj: [
    name: 'Alex'
  age: 18
  getAge: >> =age :< this//Imedinvoke
  getAge: =>> age :< this//Imedinvoke
  getAge <<= (age :< this)//Imedinvoke
  getAge => age :< this
  greeting: [title='Ms', buy from args, hello='Hey' from args22, hey='Hello' from args] (
    age:<, name:< this//:< means from
  upperName: name.toUpperCase() :< this

    = `Hi ${title} ${name}(${age}) - ${upperName}`
)
  sayHi: gender (
    + gender = 'Hey Sir'
      -= 'Hey Mis'
  )
  private: [
    men: [
    sum: < ([a, b] >= a+b)
  min<(
  valA<a:</obj
  valB<b:</obj
  c:</obj
  <<d:</obj

    =valA+valB+c+d
)
]
  wemen: [
    minus:</a,b/>=(a+b)
  altMinusL :< /a,b,c/ (
    = /a + /b + /c
)
  altMinus22< (
    = /a + /b + /c
)
  altMinus33< (
    //return obj.a + obj.bFn()
    = /obj>:a + obj>>:bFn
    //or
    = a:</obj + bFn<<:obj
)
  (/a + /b + /c) > altMinus44
]
]
]

>> greeting :< myUtilsObj
  >> greeting < 'Mrs', 'buy', 'Hello', 'Hey' :< myUtilsObj
  >> greeting < 'Ms', [buy: 'Buy', hey: 'Hello'], [hello:'Hello again'] :< myUtilsObj
  myUtilsObj >: >> greeting < 'Mrs', 'buy', 'Hello', 'Hey'
  myUtilsObj >>: greeting < 'Mrs', 'buy', 'Hello', 'Hey'
  myUtilsObj >>: greeting << getVals: (= explode :< ['Mrs', 'buy', 'Hello', 'Hey'] )
  myUtilsObj >>: greeting <<= explode :< ['Mrs', 'buy', 'Hello', 'Hey']



  myUtilsObj >: private >: men>>: sum < [2, 2] //4
  myUtilsObj >: private >: men>>: sum < 2, 2 //4
  sum < 2, 2 >>men>private>myyUtilsObj// What does '>' meanshere? '=' or '.'? 'men>privat' gonna be 'private.men', but can be catchedas 'private = men'
  2,2 > sum >>men>private>myyUtilsObj //Problem here - do we want make sum(2,2)or make sum =[2,2]??
  sum < /[2, 2] >>men>private>myyUtilsObj
