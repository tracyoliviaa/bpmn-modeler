
import { v4 as uuidv4 } from "uuid"
import { orderProcessTemplate } from "../utils/bpmn-templates"

// Define types
export interface Process {
  id: string
  name: string
  description: string | null
  definition: any
  status: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface ProcessExecution {
  id: string
  processId: string
  status: string
  startedAt: string
  completedAt: string | null
  triggerId: string | null
  triggerData: any
  error: string | null
}

export interface ProcessWithDetails extends Process {
  triggers: any[]
  executions: ProcessExecution[]
}

// Mock data
let processes: Process[] = [
  {
    id: "1",
    name: "Order Process",
    description: "Process for handling customer orders",
    definition: { bpmnXml: orderProcessTemplate },
    status: "active",
    version: 1,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Customer Onboarding",
    description: "New customer registration process",
    definition: { bpmnXml: orderProcessTemplate },
    status: "draft",
    version: 1,
    createdAt: "2023-05-10T14:20:00Z",
    updatedAt: "2023-05-10T14:20:00Z",
  },
  {
    id: "3",
    name: "Invoice Approval",
    description: "Process for approving invoices",
    definition: { bpmnXml: orderProcessTemplate },
    status: "active",
    version: 2,
    createdAt: "2023-05-05T09:15:00Z",
    updatedAt: "2023-05-05T09:15:00Z",
  },
]

let executions: ProcessExecution[] = [
  {
    id: "exec1",
    processId: "1",
    status: "completed",
    startedAt: "2023-05-15T10:35:00Z",
    completedAt: "2023-05-15T10:36:00Z",
    triggerId: null,
    triggerData: null,
    error: null,
  },
  {
    id: "exec2",
    processId: "1",
    status: "completed",
    startedAt: "2023-05-14T14:20:00Z",
    completedAt: "2023-05-14T14:21:00Z",
    triggerId: null,
    triggerData: null,
    error: null,
  },
]

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API functions
export const api = {
  // Get all processes
  getProcesses: async (): Promise<Process[]> => {
    await delay(500)
    return [...processes]
  },

  // Get a single process by ID
  getProcess: async (id: string): Promise<ProcessWithDetails> => {
    await delay(500)
    const process = processes.find((p) => p.id === id)
    if (!process) throw new Error("Process not found")
    
    const processExecutions = executions.filter(e => e.processId === id)
    
    return {
      ...process,
      triggers: [],
      executions: processExecutions,
    }
  },

  // Create a new process
  createProcess: async (data: {
    name: string
    description?: string
    definition?: any
    status?: string
  }): Promise<Process> => {
    await delay(500)

    if (!data.name) throw new Error("Process name is required")

    const now = new Date().toISOString()
    const newProcess = {
      id: uuidv4(),
      name: data.name,
      description: data.description || null,
      definition: data.definition || { bpmnXml: orderProcessTemplate },
      status: data.status || "draft",
      version: 1,
      createdAt: now,
      updatedAt: now,
    }

    processes = [...processes, newProcess]
    return { ...newProcess }
  },

  // Update a process
  updateProcess: async (
    id: string,
    data: {
      name?: string
      description?: string
      definition?: any
      status?: string
    },
  ): Promise<Process> => {
    await delay(500)

    const index = processes.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Process not found")

    const now = new Date().toISOString()
    const updatedProcess = {
      ...processes[index],
      name: data.name || processes[index].name,
      description: data.description !== undefined ? data.description : processes[index].description,
      definition: data.definition || processes[index].definition,
      status: data.status || processes[index].status,
      version: processes[index].version + 1,
      updatedAt: now,
    }

    processes = [...processes.slice(0, index), updatedProcess, ...processes.slice(index + 1)]
    return { ...updatedProcess }
  },

  // Delete a process
  deleteProcess: async (id: string): Promise<{ success: boolean }> => {
    await delay(500)

    const index = processes.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Process not found")

    processes = [...processes.slice(0, index), ...processes.slice(index + 1)]
    return { success: true }
  },

  // Execute a process
  executeProcess: async (id: string, data: any = {}): Promise<{
    success: boolean
    executionId: string
    status: string
    startedAt: string
  }> => {
    await delay(500)

    const process = processes.find((p) => p.id === id)
    if (!process) throw new Error("Process not found")

    const now = new Date().toISOString()
    const executionId = uuidv4()
    const execution: ProcessExecution = {
      id: executionId,
      processId: id,
      status: "running",
      startedAt: now,
      completedAt: null,
      triggerId: null,
      triggerData: data,
      error: null,
    }

    // Add the execution
    executions = [execution, ...executions]

    // Simulate process completion after a delay
    setTimeout(() => {
      const executionIndex = executions.findIndex((e) => e.id === executionId)
      if (executionIndex !== -1) {
        const updatedExecution = {
          ...executions[executionIndex],
          status: "completed",
          completedAt: new Date().toISOString(),
        }

        executions = [
          ...executions.slice(0, executionIndex),
          updatedExecution,
          ...executions.slice(executionIndex + 1),
        ]
      }
    }, 5000)

    return {
      success: true,
      executionId,
      status: "running",
      startedAt: now,
    }
  },
}
export {}