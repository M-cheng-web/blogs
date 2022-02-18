class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.taskList = [];
  }

  async add(fun) {
    if (this.count >= this.max) {
      await new Promise(reslove => this.taskList.push(reslove))
    }
    this.count++
    const res = await fun()
    this.count--
    this.taskList.length && this.taskList.shift()()
    return res
  }
}

// 延迟函数
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 2
// 3
// 1
// 4
