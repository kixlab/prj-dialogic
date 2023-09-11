export const en = true;

const enText = {
  phase_1: {
    title: 'Initial Generation',
    task_1: {
      title: 'Upload your video',
      description: 'Choose an English video that is smaller than 25MB in size.',
      button_1: 'Choose the file',
      button_2: '(.mp4) to upload',
    },
    task_2: {
      title: 'Trim the video',
      description: 'Ensure trimming is completed, before clicking Next. Trim can be done only once.',
      button_1: 'Trim',
    },
    task_3_base: {
      title: 'Confirm the transcript',
      description: 'Directly edit the auto-generated transcript.',
    },
    task_3: {
      title: 'Confirm the transcript and highlight',
      description: 'Directly edit the auto-generated transcript. Highlight the part where the learner might have difficult.',
      button_1: 'Edit',
      button_2: 'Highlight'
    },
    task_4: {
      title: 'Write the dialogue scenario',
      description: 'Check the descriptions by hovering each field.',
      button_1: 'Number of Tutee',
      button_2: { title: 'Learning Context', description: "[example]\nThis is a science class in the 2nd grade of middle school.\nThis is a physics class for the third year of high school." },
      button_3: { title: 'Learning Scenario', description: "[example]\nas if a tutor deliberately present incorrect problem scenarios and asking a tutee to explain where the error lies\nas if a tutor collaboratively worked through problems that the tutee initially struggled with.\nas if a tutor is guiding two tutees, Tom and Emily." }
    },
  },
  phase_2: {
    title: 'Evaluation',
    task_1: {
      title: '',
      description: '',
      button_1: '',
      button_2: '',
      button_3: {
        title: '',
        description: ''
      },
      button_4: {
        title: '',
        description: ''
      },
      button_5: {
        title: '',
        description: ''
      },
    },
    task_2: {
      title: 'Select a one dialogue',
      description_base: '.',
      description: 'Select a dialogue you want to revise. Click the reload button to get more dialogues.',
      button_1: 'Reload',
      card_1: 'Dialogue',
      card_2: 'Level',
      card_3: 'Concept',
      modal_0: 'Selected Dialogue',
      modal_1: 'Dialogue Summary',
      modal_2: 'Learning Strategy',
      modal_3: 'Utterance Pattern',
      modal_4: 'Knowledge Level',
    },

  },
  phase_3: {
    title: 'Refinement',
    task_1: {
      title: 'Revise the selected dialogue',
      description: 'Directly modify or utilize the toolbox on the left for each utterance. Alter the sequence of utterances through drag-and-drop. Provide a title for the final dialogue.',
      button_1: 'Description',
      button_2: 'Magic',
      button_3: 'Transcript',
      button_4: {
        title: 'Target',
        description: 'selected',
      },
      button_5: {
        title: 'Option',
        description: 'Perserve the origin utterance pattern',
      },
      button_6: 'Apply',
      description_1: "Add Utterance",
      description_2: "Change Speaker",
      description_3: "Duplicate Utterance",
      description_4: "Discard Utterance",

    },
    task_2: {
      title: 'Download the final dialogue',
      description: 'Click download to save as pdf.',
      button_1: 'Download',
    },

  },
  buttons: {
    task: 'Next',
    phase: 'Continue',
    done: 'Done',
  },
  dialoge: {
    tutor: 'Tutor',
    tutee: 'Tutee',
    strategies: {
      cognitive_conflict: {
        title: 'Cognitive conflict',
        description: 'A strategy that triggers new understanding and perspectives through conflicts of thought',
      },
      metacognitive_prompting: {
        title: 'Metacognitive prompting',
        description: 'A strategy that encourages learners to be aware of their own thinking and learning processes',
      },
      cognitive_prompting: {
        title: 'Cognitive prompting',
        description: 'A strategy that draws out important information or ideas that learners already know',
      },
      deep_level_reasoning_questions: {
        title: 'Deep-level reasoning questions',
        description: 'A strategy that provides questions to stimulate higher-order thinking and critical analysis',
      }
    }
  }
}

const koText = {
  phase_1: {
    title: 'Initial Generation',
    task_1: {
      title: '강의 비디오 업로드 하기',
      description: '25MB 이하의 한국어 강의 영상을 선택해주세요.',
      button_1: '업로드할 파일을',
      button_2: '(.mp4) 선택하세요',
    },
    task_2: {
      title: '대화형으로 전환할 구간 선택하기',
      description: '구간 선택 후 자르기 버튼을 클릭하세요. 자르기는 최대 1번 진행할 수 있습니다.',
      button_1: '자르기',
    },
    task_3_base: {
      title: '영상 스크립트 확인하기',
      description: '자동 생성된 영상 스크립트를 직접 편집하세요.',
    },
    task_3: {
      title: '영상 스크립트 확인 및 하이라이트 하기',
      description: '자동 생성된 영상 스크립트를 직접 편집하세요. 학습자가 어려움을 겪을 법한 구간을 드래그하여 하이라이트 하세요.',
      button_1: '편집',
      button_2: '하이라이트'
    },
    task_4: {
      title: '대화 시나리오 작성하기',
      description: '대화 생성의 배경 시나리오를 설정해주세요. 학생 수는 고정된 값 입니다.',
      button_1: '대화 속 학생 수',
      button_2: { title: '학습 환경', description: "[예시]\n중학교 2학년 과학 수업\n고등학교 3학년 물리 수업" },
      button_3: { title: '학습 시나리오', description: "[예시]\n교사가 오류가 포함된 문제상황을 제시하고, 학생에게 직접 설명하고 고쳐보라고 하는 상황\n학생이 어려워하는 내용을 교사가 학생과 협력적으로 대화하며 해결해나가는 상황\n교사가 두 명의 학생 간의 대화를 이끌어주는 상황" }
    },
  },
  phase_2: {
    title: 'Evaluation',
    task_1: {
      title: '대화의 목적 생각하기',
      description: '생성된 대화를 평가하기 전 다음 질문에 대답하며 대화의 목적을 명확히 해주세요.',
      button_1: '독백 스크립트 숨기기',
      button_2: '독백 스크립트 보기',
      button_3: {
        title: '학습자 수준 상정 이유',
        description: '강의를 보는 학생들을 어떤 기준으로 나누어 어떤 수준의 학생들을 고려하였나요?'
      },
      button_4: {
        title: '독백 스크립트 구간을 선택한 이유',
        description: '전체 강의 영상 중 해당 구간을 대화형으로 전환하는 이유가 무엇인가요?'
      },
      button_5: {
        title: '하이라이트 구간을 선택한 이유',
        description: '독백 스크립트 중 해당 구간에서 학습자가 어떤 학습적 어려움을 겪을 수 있나요?'
      },
    },
    task_2: {
      title: '생성된 대화 선택하기',
      description_base: '생성된 대화 중 하나를 선택하세요. 재생성 버튼을 눌러 더 많은 대화를 확인할 수 있습니다.',
      description: '생성된 대화 중 하나를 선택하세요. 재생성 버튼을 눌러 더 많은 대화를 확인할 수 있습니다. 대화가 생성되는 동안 아래의 표를 확인하세요. 강의에 등장한 주요 개념에 대해 학습자가 가질 수 있는 수준을 정리한 내용입니다.',
      button_1: '재생성',
      card_1: '대화',
      card_2: '수준',
      card_3: '개념',
      modal_0: '선택된 대화',
      modal_1: '대화 줄거리',
      modal_2: '학습 전략',
      modal_3: '발화 유형',
      modal_4: '학습자 수준',

    },

  },
  phase_3: {
    title: 'Refinement',
    task_1: {
      title: '선택한 대화 편집하기',
      description: '각 발화를 직접 편집하거나 좌측 상단의 편집도구를 이용하여 수정하세요. 각 발화의 순서는 드래그-드랍으로 변경할 수 있습니다. 최종 대화에 제목을 지어 완성하세요.',
      button_1: '대화 설명',
      button_2: '실험실',
      button_3: '독백 스크립트',
      button_4: {
        title: '선택 대상',
        description: '개 선택됨',
      },
      button_5: {
        title: '선택 옵션',
        description: '발화 유형 유지하기',
      },
      button_6: '적용하기',
      description_1: "발화 추가하기",
      description_2: "화자 바꾸기",
      description_3: "발화 복사하기",
      description_4: "발화 삭제하기",
    },
    task_2: {
      title: '최종 대화 다운로드하기',
      description: '저장하기 버튼을 눌러 PDF로 다운로드 받으세요.',
      button_1: '저장하기',
    },

  },
  buttons: {
    task: '다음으로',
    phase: '계속하기',
    done: '끝내기',
  },
  dialoge: {
    tutor: '교사',
    tutee: '학생',
    strategies: {
      cognitive_conflict: {
        title: '인지갈등 (Cognitive conflict)',
        description: '생각의 충돌을 통해 새로운 이해와 관점을 유발하는 전략',
      },
      metacognitive_prompting: {
        title: '메타인지적 프롬프팅 (Metacognitive prompting)',
        description: '학습자 스스로 사고 및 학습과정을 인지할 수 있도록 유도하는 전략',
      },
      cognitive_prompting: {
        title: '인지적 프롬프팅 (Cognitive prompting)',
        description: '학습자가 알고 있는 중요한 정보 또는 아이디어를 끌어내는 전략',
      },
      deep_level_reasoning_questions: {
        title: '심층질문 (Deep-level reasoning questions)',
        description: '고차원적 사고와 비판적 분석을 촉진하기 위한 질문을 제공하는 전략',
      }
    }
  }
}
export const text = en ? enText : koText;
