// pages/todos/todos.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    activeTodos: [],
    editedTodo: {},
    draft: '',
    editDraft: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      todos: [...wx.getStorageSync("todos")],
      activeTodos: [...wx.getStorageSync("activeTodos")]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setTodos: function (todos) {
    console.log(todos)
    const activeTodos = todos.filter(todo => !todo.done);
    wx.setStorageSync("todos", todos);
    wx.setStorageSync("activeTodos", activeTodos);
    this.setData({
      todos,
      activeTodos,
    });
  },
  addTodo: function () {
    var value = this.data.draft && this.data.draft.trim()
    if (!value) {
      return;
    }
    let newTodo = this.data.todos;
    newTodo.push({
      id: util.formatDate(new Date()),
      done: false,
      content: value
    });
    const activeTodos = newTodo.filter(todo => !todo.done);
    wx.setStorageSync("todos", newTodo);
    wx.setStorageSync("activeTodos", activeTodos);
    this.setData({
      todos: newTodo,
      activeTodos,
      draft: ''
    });
  },
  toggleDone: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    const { todos } = this.data;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    currentTodo.done = !currentTodo.done;
    this.setTodos(todos)
  },
  editTodo: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    this.setData({
      editDraft: null,
      editedTodo: this.data.todos.filter(todo => todo.id === id)[0] || {}
    });
  },
  removeDone: function () {
    const activeTodos = this.data.todos.filter(todo => !todo.done)
    console.log(activeTodos);
    this.setTodos(activeTodos)
  },
  updateDraft: function ({
    detail: {
      value
    }
  }) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      draft: value
    });
  },
  goTodo: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    const currentToDo = this.data.todos.filter(todo => todo.id === id)[0] || {};
    console.log(currentToDo)
    if (!currentToDo.done){
      wx.navigateTo({
        url: '../task/task?name=' + currentToDo.content,
      });
    }
    
  },
  setting: function () {
    wx.navigateTo({
      url: '../timeset/timeset',
    });
  },
})