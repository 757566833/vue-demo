class A {
    constructor(){
        this.test=()=>{
            console.log(this)
        }
    }
    test2(){
        console.log(this)
    }
    
}
let a = new A();
a.test();
a.test2();