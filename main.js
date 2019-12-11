const { app, BrowserWindow ,ipcMain,dialog,ipcRenderer} = require('electron')
const DataStore =require('./renderer/MusicDataStore')


const myStore=new DataStore({'name':'Music Data'})

class AppWindow extends BrowserWindow{
  constructor(config,fileLocation){
    const basicConfig={
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      }
    }

    // const finalConfig = Object.assign(basicConfig,config)  ;//合并
    const finalConfig={...basicConfig,...config};// 展开
    super(finalConfig);//调用父类完成工作
    this.loadFile(fileLocation)
    // 优雅的显示  loading
    this.once('ready-to-show',()=>{
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({},'./renderer/index.html');
  mainWindow.webContents.on("did-finish-load",()=>{
    mainWindow.send('getTracks',myStore.getTracks())

  })

    ipcMain.on('add-music-window',(event)=>{
   
      const addWindow=new AppWindow({
        width:500,
        height:400, 
        parent:mainWindow
      },'./renderer/add.html') 
    })
   
 
    ipcMain.on('add-tracks',(event,tracks)=>{
 
     const updatedTracks=  myStore.addTracks(tracks).getTracks();
      mainWindow.send('getTracks',updatedTracks);
    })
    ipcMain.on('delete-track',(event,id)=>{
      const updatedTracks=myStore.deleteTrack(id).getTracks();
      mainWindow.send('getTracks',updatedTracks);
     })
    
    ipcMain.on('open-music-file',(event)=>{
      console.log(1111111111111);

      // event.sender.send('selected-file',"老鼠爱大米") ;
      
      dialog.showOpenDialog({
        properties:['openFile','multiSelections'],
        filters:[{name:"Music",extensions:['mp3']}]
      },(files)=>{ 

        if(files){
          event.sender.send('selected-file',files) 
        }
      });
   
    })
   
})
 
