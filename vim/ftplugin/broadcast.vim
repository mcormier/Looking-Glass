
"if exists("b:loaded_broadcastPlugin")
"  finish
"endif
"let b:loaded_broadcastPlugin= 1

let s:lastLineNmbr=0
let s:lastCurrLineValue=''

" Returns true(1) if an arrow key was pressed
"if !exists('*s:ArrowKeyPushed')
function! s:ArrowKeyPushed()
  let l:line_save = line(".")
  let l:retVal = 0

  " line changed with up or down arrow
  if l:line_save != s:lastLineNmbr
    call s:SaveLineValue()
    let l:retVal = 1
  endif
  
  let s:lastLineNmbr = l:line_save

  " The current line has not been changed
  " but the cursor moved, an arrow key was pushed
  if s:lastCurrLineValue == getline(".")
    let l:retVal = 1
  endif

  return l:retVal
endfunction
"endif

let s:lastChange=0

if !exists('*s:Debug')
function s:Debug(toOutput)
  silent execute '!date "+\%H:\%M:\%S " | tr -d "\n" >> output.txt'
  silent execute "!echo " . shellescape(a:toOutput) . " >> output.txt"
endfunction
endif

"if !exists('*s:Echo')
function! s:Echo()
  let l:line_save = line(".")

  " Elimnate up and down arrow from causing echos.
  if s:ArrowKeyPushed() 
    return
  endif
  
  
  let l:col_save = col(".")
  "yank last letter and paste it 
	"execute "normal! hylp" 
	
  let s:lastCurrLineValue=getline('.')

	call s:Debug("(line, col) --> (" . line(".") . "," . col('.') . ")" )

  " String is 0 indexed based, and column is 1 index based and a character
  " has been inserted so currentColumn - 2
	call s:Debug("Inserted --> " . strpart(s:lastCurrLineValue, col('.')-2, 1) )
 
endfunction
"endif


function! s:SaveLineValue()
 let s:lastCurrLineValue=getline('.')
endfunction

" Calling debug causes flicker
function! s:ReplaceChar()
  let l:value = getchar()
	execute "normal! r" . nr2char(l:value)

  " We need to send output this way or else the screen goes blank 
  let x = system('echo "test" >> output.txt')
endfunction


function! s:EnteredInsertMode()
 let s:lastLineNmbr=line('.')
 call s:SaveLineValue()
 call s:Debug("Entered InsertMode. Current line: " . s:lastCurrLineValue)
endfunction

function! s:ExitedInsertMode()
endfunction

" VIM events -->
" http://www.ibm.com/developerworks/linux/library/l-vim-script-5/index.html
" :help autocommand
if !exists('broadcast_autocommands_loaded')
  let s:bct_autocmd_loaded=0
  autocmd! CursorMovedI *.broadcast :call s:Echo()
  autocmd! InsertEnter *.broadcast :call s:EnteredInsertMode()
  autocmd! InsertLeave *.broadcast :call s:ExitedInsertMode()
endif

" detect replace with 'r'
noremap <silent> <buffer> r :call <SID>ReplaceChar()<cr>


" TODO -- detect paste with 'p'


" User changed from replace to insert mode or vice versa
" autocmd InsertChange * call s:Debug("InsertChange")

" Reference: 
" For a list of VIM defined functions (section 41.6)
" :help usr_41.txt 
"