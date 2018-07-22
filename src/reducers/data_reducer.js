export default () => {
    return {
        articles: {
            definite: {
                french: [
                    { article: 'le', gender: 'masculine' },
                    { article: 'la', gender: 'feminine' }
                ],
                german: []
            },
            indefinite: {
                french: [
                    { article: 'un', gender: 'masculine' },
                    { article: 'une', gender: 'feminine' }
                ],
                german: []
            }
        },
        pronouns: {
            subject: {
                // french: ['je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles'],
                // german: ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'],
                french: [
                    { word: 'je', meaning: "I" },
                    { word: 'tu', meaning: 'You' }, 
                    { word: 'il', meaning: 'He' }, 
                    { word: 'elle', meaning: 'She' },
                    { word: 'on', meaning: 'It, we' },
                    { word: 'nous', meaning: 'We' },
                    { word: 'vous', meaning: 'You', note: 'plural' },
                    { word: 'ils', meaning: 'They' },
                    { word: 'elles', meaning: 'they', note: 'feminine' }
                ],
                german: [
                    { word: 'ich', meaning: "I" },
                    { word: 'du', meaning: 'You' }, 
                    { word: 'er', meaning: 'He' }, 
                    { word: 'sie', meaning: 'She' },
                    { word: 'es', meaning: 'It' },
                    { word: 'wir', meaning: 'We' },
                    { word: 'ihr', meaning: 'You', note: 'informal, plural' },
                    { word: 'sie', meaning: 'They' },
                    { word: 'Sie', meaning: 'You', note: 'formal, singlar or plural' }
                ]
            }
        }
    };
};