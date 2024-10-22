import { z } from 'zod'

import output from '../chat/output.json'

export const stages = [
  'create-draft-1',
  'create-draft-2',
  'create-draft-3',
  'analysis-ready-1',
  'analysis-ready-2',
  'start-analysis',
  'crawling-domains',
  'categorizing-data',
  'preparing-analysis',
  'download-report'
] as const

const stageSchema = z.enum(stages)
export type TStage = z.infer<typeof stageSchema>

const groups = [
  'create-draft',
  'analysis-ready',
  'start-analysis',
  'crawling-domains',
  'categorizing-data',
  'preparing-analysis',
  'download-report'
] as const

export const groupSchema = z.enum(groups)
export type TGroup = z.infer<typeof groupSchema>

export const groupedStages = {
  'create-draft': ['create-draft-1', 'create-draft-2', 'create-draft-3'],
  'analysis-ready': ['analysis-ready-1', 'analysis-ready-2'],
  'start-analysis': ['start-analysis', 'crawling-domains'],
  'crawling-domains': ['categorizing-data'],
  'categorizing-data': ['preparing-analysis'],
  'preparing-analysis': ['download-report'],
  'download-report': []
} as Record<TGroup, TStage[]>

export const autoNextStages = [
  'start-analysis',
  'crawling-domains',
  'categorizing-data',
  'preparing-analysis'
] as TStage[]

const actionSchema = z.enum(['pre-start', 'start', 'cancel', 'view'])
export type TAction = z.infer<typeof actionSchema>

const currentInputSchema = z.string()
export type TCurrentInput = z.infer<typeof currentInputSchema>

const chatSchema = z.object({
  isMe: z.boolean(),
  message: z.string()
})
export type TChat = z.infer<typeof chatSchema>

const logSchema = z.object({
  created_at: z.string(),
  message: z.string()
})
export type TLog = z.infer<typeof logSchema>

const organization = z.object({
  organization_name: z.string().optional()
})

const range = z.object({
  range: z.string().optional()
})

const homepage = z.object({
  homepage_domain: z.string().optional()
})

const infoSchema = organization.and(range).and(homepage)
export type TInfo = z.infer<typeof infoSchema>

const stageDataSchema = z.object({
  'current-input': currentInputSchema,
  'chat-history': z.array(chatSchema),
  info: infoSchema,
  'log-history': z.array(logSchema),
  action: actionSchema
})
export type TStageData = z.infer<typeof stageDataSchema>

const stagesDataSchema = z.record(stageSchema, stageDataSchema)
export type TStagesData = z.infer<typeof stagesDataSchema>

export const data = stagesDataSchema.parse(output)
export const IStageData = {
  'current-input': '',
  'chat-history': [],
  info: {},
  'log-history': [],
  action: 'pre-start'
} satisfies TStageData
