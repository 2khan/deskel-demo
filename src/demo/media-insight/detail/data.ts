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
    'current-input':
      '「Company Inc」のニュースメディア分析レポートを作成したいです。',
    'chat-history': [
      {
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      }
    ],
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
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
    'current-input': 'Company Inc」のホームページURLは company.com です。',
    'chat-history': [
      {
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          '対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
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
    'current-input': 'はい、お願いします。',
    'chat-history': [
      {
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
      },
      {
        isMe: true,
        message: 'はい、お願いします。'
      },
      {
        isMe: false,
        message: '分析を開始いたします。'
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
      },
      {
        isMe: true,
        message: 'はい、お願いします。'
      },
      {
        isMe: false,
        message: '分析を開始いたします。'
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
      },
      {
        isMe: true,
        message: 'はい、お願いします。'
      },
      {
        isMe: false,
        message: '分析を開始いたします。'
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
      },
      {
        isMe: true,
        message: 'はい、お願いします。'
      },
      {
        isMe: false,
        message: '分析を開始いたします。'
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
        isMe: false,
        message:
          'DESKELニュースメディア分析アシスタントです。ご要件をお伺いします。'
      },
      {
        isMe: true,
        message:
          '「Company Inc」のニュースメディア分析レポートを作成したいです。'
      },
      {
        isMe: false,
        message:
          '了解致しました。「Company Inc」のレポートですね。対象期間はどのように設定しますか？'
      },
      {
        isMe: true,
        message: '2024年6月2日から2024年9月2日まで。'
      },
      {
        isMe: false,
        message:
          ' 対象期間は2024年6月2日から2024年9月2日までで設定します。対象企業のホームページURLを教えていただけますか？'
      },
      {
        isMe: true,
        message: 'Company Inc」のホームページURLは company.com です。'
      },
      {
        isMe: false,
        message:
          '了解致しました。それでは以下の内容で分析を開始いたしますが、よろしいでしょうか？。\n組織名：「Company Inc」\n対象期間：2024年6月2日から2024年9月2日\nホームページURL：company.com'
      },
      {
        isMe: true,
        message: 'はい、お願いします。'
      },
      {
        isMe: false,
        message: '分析を開始いたします。'
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
