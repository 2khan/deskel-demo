import { TStatus } from '../common'

export type TReport = {
  name: string
  created_at: string
}

export type TCompetitor = {
  organization_name: string | null
  homepage_domain: string
}

export type TInfo = {
  organization_name: string | null
  range: string | null
  homepage_domain: string
}

export type TChat = {
  isMe: boolean
  message: string
}

export type TStage =
  | 'create-draft'
  | 'analysis-ready'
  | 'start-analysis'
  | 'crawling-domains'
  | 'categorizing-data'
  | 'preparing-analysis'
  | 'download-report'

export type TAugStage =
  | 'create-draft-organization-name'
  | 'create-draft-range'
  | 'create-draft-homepage-domains'
  | 'analysis-ready'
  | 'start-analysis'
  | 'crawling-domains'
  | 'categorizing-data'
  | 'preparing-analysis'
  | 'download-report'

export type TStageData = {
  'current-input': string
  'chat-history': TChat[]
  info: TInfo
  nextStage: TAugStage
  status: TStatus
  reports: TReport[]
}

export const StageDataMap = {
  'create-draft-organization-name': {
    'current-input': '「Company Inc」のSWOT分析を生成する。',
    'chat-history': [],
    info: {
      organization_name: '',
      homepage_domain: '',
      range: ''
    },
    nextStage: 'create-draft-range',
    status: 'draft',
    reports: []
  },
  'create-draft-range': {
    'current-input': '2024年6月2日から2024年9月2日まで。',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: '',
      range: ''
    },
    nextStage: 'create-draft-homepage-domains',
    status: 'draft',
    reports: []
  },
  'create-draft-homepage-domains': {
    'current-input':
      '「Company Inc」のホームページドメインは company.com です。',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: '',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'analysis-ready',
    status: 'draft',
    reports: []
  },
  'analysis-ready': {
    'current-input': 'company-international.comも追加してください。',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'start-analysis',
    status: 'draft',
    reports: []
  },
  'start-analysis': {
    'current-input': '',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      },
      {
        isMe: true,
        message: 'company-international.comも追加してください。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に更新されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company-international.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'crawling-domains',
    status: 'draft',
    reports: []
  },
  'crawling-domains': {
    'current-input': '',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      },
      {
        isMe: true,
        message: 'company-international.comも追加してください。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に更新されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company-international.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'categorizing-data',
    status: 'draft',
    reports: []
  },
  'categorizing-data': {
    'current-input': '',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      },
      {
        isMe: true,
        message: 'company-international.comも追加してください。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に更新されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company-international.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'preparing-analysis',
    status: 'draft',
    reports: []
  },
  'preparing-analysis': {
    'current-input': '',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      },
      {
        isMe: true,
        message: 'company-international.comも追加してください。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に更新されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company-international.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'download-report',
    status: 'draft',
    reports: []
  },
  'download-report': {
    'current-input': '',
    'chat-history': [
      {
        isMe: true,
        message: '「Company Inc」のSWOT分析を生成する。'
      },
      {
        isMe: false,
        message: '組織名が正常に設定されました。'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message: '日付範囲が正常に設定されました。'
      },
      {
        isMe: true,
        message: '「Company Inc」のホームページドメインは company.com です。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に追加されました。'
      },
      {
        isMe: true,
        message: 'company-international.comも追加してください。'
      },
      {
        isMe: false,
        message: 'ホームページのドメインが正常に更新されました。'
      }
    ],
    info: {
      organization_name: 'Company Inc',
      homepage_domain: 'company-international.com',
      range: '2024/06/02 - 2024/09/02'
    },
    nextStage: 'download-report',
    status: 'draft',
    reports: []
  }
} satisfies Record<TAugStage, TStageData>
