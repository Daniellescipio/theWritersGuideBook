const story = {
    title:'Name Your Story', 
    description: 'Describe your idea, it can be as indepth, clear, complicated, as you need it to be. This is your story, tell me about it.(think main characters, their goals? what standins in their way? How important is the setting, You can come back to this if Your not sure yet! Maybe you want to add some characters or a plot first!)'
}
const firstCharacter = {
    name: 'What should we call this character?', 
    description: 'Describe your character! here are some thoughts to get you started...Are they tall, short, smart, funny, fluent in spanish, a wizard, how old are they, family? are they a student, do they have a job(is it saving the world).', 
    type:'Protagonist',
    quality:'Dynamic',
    goals:[], 
    traits:[],
    backStory:[],
    extras : [],
    fatalFlaw:'To Sexy for their Shirt'
}
const firstSetting = {
    main: true,
    name: 'Setting',
    smells: [], 
    sights:[],
    sounds:[],
    feelings:[],
    taste:[],
    characters:[],
    when:[],
    extras : [],
}
const firstPlot =  {
    characters:[],
    name: 'Dramatic Plot', 
    description: 'Give us a general Idea of your plot, You might have more details to add here as you build your climax or resolution.', 
    conflicts: [],
    risingAction:[],
    fallingAction:[],
    resolutions:[],
    extras : [],
}

const firstClimax = {
    conflicts:[],
    settings:[],
    description: 'You can give a general description of your climax or write out the whole thing! Some people find it easier to write a series of events!',
    events: [], 
    resolutions:[], 
    extras: []
}
export {story, firstCharacter, firstSetting, firstPlot, firstClimax}