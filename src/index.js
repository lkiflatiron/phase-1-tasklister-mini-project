  // your code here
  const taskList = [] //global array of task object

  const form = document.querySelector('#create-task-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    //another way to get elements passed in from e (event object), using the name attribute
    const test = e.target['new-task-description'].value //cause it has dashes in the element name attribute
    const test1 = e.target.prioritiesList.value
    console.log(test,test1)

    const task = {
      name: e.target.elements[0].value,
      priority: e.target.elements[1].value,
      date: e.target.elements[2].value
    }

    if (e.target.elements[0].value) {
      taskList.push(task)
      createToDo(taskList)
    }

    form.reset()
  })

  function createToDo(taskList) {
    // const input = document.querySelector('#new-task-description')
    // if (input.value) {
    const ul = document.querySelector('#tasks')
    ul.innerHTML = '';  //clear current todo list li's 
    //sort task by priority if more than one task
    if (taskList.length > 1) {
      taskList.sort((task1, task2) => task1.priority - task2.priority)
    }

    //iterate through sorted task list, color each task, and append 
    taskList.forEach(task => {
      const ul = document.querySelector('#tasks')
      li = document.createElement('li')
      li.textContent = task.name
      if (task.date) {
        li.textContent = `${li.textContent} / ${task.date}`
      }

      li = colorTasks(task, li)
  
      ul.appendChild(li)
      createDeleteButton(li)
    })
  }

  //add a color to a task based on priority
  function colorTasks(task, li) {
    switch (task.priority) {
      case "1":
        li.style.color = 'red'
        break
      case "2":
        li.style.color = "green"
        break
      case "3":
        li.style.color = "blue"
        break
      default:
        li.style.color = "black"
    }
    return li
  }

  function createDeleteButton(li) {
    const btn = document.createElement('button')
    btn.classList.add("deleteBtn");
    btn.textContent = 'x'
    li.appendChild(btn)
    handleDelete(btn)
  }

  function handleDelete(btn) {
    btn.addEventListener('click', () => {
      btn.parentNode.remove()
    })
  }
