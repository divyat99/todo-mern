export const rootPaths = {
  homeRoot: '/',
  authRoot: 'authentication',
  errorRoot: 'error',
  //  createTodoRoot: 'create/todo',
  
   viewProfile:'viewprofile'
};



export default {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  // createTodo: `/${rootPaths.createTodoRoot}`,
  404: `/${rootPaths.errorRoot}/404`,
 
  // viewProfile:`/${rootPaths.viewProfile}`
};
