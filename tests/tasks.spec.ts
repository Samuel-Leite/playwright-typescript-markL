import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

test('Cadastrar uma nova tarefa', async ({ page, request }) => {

    const task = data.success as TaskModel

    await deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)
})

test('Não deve permitir tarefa duplicada', async ({ page, request }) => {

    const task = data.duplicate as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test('Validar obrigatoriedado do campo', async ({ page }) => {

    const task = data.required as TaskModel

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.create(task)

    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})