import React, { Component } from 'react'

function handleSubmit(e) {
  document.getElementsByClassName('popup')[0].style.display='none'
}
function textChange(e) {
  this.state.content = e.value;
  console.log(e.value)
}
function closeDialog(){
  console.log('close')
  document.getElementsByClassName('popup')[0].style.display='none'
}
class Pupop extends Component{
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '1',
      content: '1'
    }
  }


  render() {
   
    let self = this;
    return (
      <section className="popup" >
        <div className="pbox">
          <span className="close" onClick={closeDialog}>X</span>
          <div>
            <h4>计划标题</h4>
            <input defaultValue={self.state.title} placeholder="请输入计划标题"/>
          </div>
          <div>
            <h4>计划内容</h4>
            <textarea defaultValue={self.state.content} placeholder="请输入计划内容" rows="3" onChange={textChange}></textarea>
          </div>
          <div className="pBtn">
            <span>取消</span>
            <span onClick={handleSubmit}>确认</span>
          </div>
        </div>
      </section>
    )
  }
}
export default Pupop
