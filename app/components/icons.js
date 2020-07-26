import React, { Component } from 'react'

export { default as ExpandMoreIcon } from '@material-ui/icons/ExpandMore'
export { default as MoreVertIcon } from '@material-ui/icons/MoreVert'
export { default as OpenIcon } from '@material-ui/icons/OpenInNew'
export { default as LaunchIcon } from '@material-ui/icons/Launch'
export { default as RemoveIcon } from '@material-ui/icons/RemoveCircle'
export { default as NavigateNextIcon } from '@material-ui/icons/NavigateNext'
export { default as SettingsIcon } from '@material-ui/icons/Settings'
export { default as FormatIcon } from '@material-ui/icons/Folder'
export { default as MenuIcon } from '@material-ui/icons/Menu'
export { default as AuthErrorIcon } from '@material-ui/icons/Lock'
export { default as ErrorIcon } from '@material-ui/icons/Error'
export { default as DoneIcon } from '@material-ui/icons/Done'
export { default as TimerIcon } from '@material-ui/icons/Timer'
export { default as LogIcon } from '@material-ui/icons/Note'
export { default as HomeIcon } from '@material-ui/icons/Home'
export { default as NextIcon } from '@material-ui/icons/KeyboardArrowRight'
export { default as DownloadIcon } from '@material-ui/icons/CloudDownload'
export { default as SaveIcon } from '@material-ui/icons/Save'
export { default as RevertIcon } from '@material-ui/icons/Restore'
export { default as BrainIcon } from '@material-ui/icons/Image'
export { default as EditIcon } from '@material-ui/icons/Edit'
export { default as AddIcon } from '@material-ui/icons/Add'
export { default as HelpIcon } from '@material-ui/icons/Help'
export { default as DuplicateIcon } from '@material-ui/icons/FileCopy'
export { default as UploadIcon } from '@material-ui/icons/CloudUpload'
export { default as DeleteIcon } from '@material-ui/icons/Delete'
export { default as AdvancedConfigIcon } from '@material-ui/icons/SettingsApplications'
export { default as FeedbackIcon } from '@material-ui/icons/Feedback'
export { default as GroupIcon } from '@material-ui/icons/Group'
export { default as BulletIcon } from '@material-ui/icons/Lens'
export { default as DefaultIcon } from '@material-ui/icons/Star'
export { default as ViewIcon } from '@material-ui/icons/ImageSearch'
export { default as CheckIcon } from '@material-ui/icons/CheckCircle'
export { default as UncheckIcon } from '@material-ui/icons/RemoveCircle'
export { default as FilterIcon } from '@material-ui/icons/Search'


export { default as PipelineIcon } from '@material-ui/icons/DeviceHub'
export { default as PipelineStepIcon } from '@material-ui/icons/Extension'
export { default as PipelineExecutionTimeIcon } from '@material-ui/icons/AccessTime'

export { default as DatasetIcon } from '@material-ui/icons/Accessibility'
export { default as SubjectIcon } from '@material-ui/icons/Accessibility'
export { default as ParticipantIcon } from '@material-ui/icons/Accessibility'

export { default as SchedulerIcon } from '@material-ui/icons/DeveloperBoard'
export { default as SchedulerAwsIcon } from '@material-ui/icons/Cloud'
export { default as SchedulerLocalIcon } from '@material-ui/icons/Laptop'
export { default as SchedulerApiIcon } from '@material-ui/icons/SettingsRemote'
export { default as SchedulerSshIcon } from '@material-ui/icons/Link'
export { default as SchedulerDockerIcon } from '@material-ui/icons/Devices'

export { default as ExecutionIcon } from '@material-ui/icons/PlayCircleFilled'
export { default as ExecutionPausedIcon } from '@material-ui/icons/PauseCircleFilled'
export { default as ExecutionSuccess } from '@material-ui/icons/Done'
export { default as ExecutionError } from '@material-ui/icons/Error'
export { default as ExecutionRunning } from '@material-ui/icons/PlayArrow'
export { default as ExecutionUnknown } from '@material-ui/icons/Remove'

import SvgIcon from '@material-ui/core/SvgIcon';

export const LoadingIcon = (props) => 
<SvgIcon viewBox="0 0 40 40" {...props}>
  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
  </path>
</SvgIcon>

// export const BrainIcon = createSvgIcon(
//   <g><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" /></g>
// , 'BrainIcon')
// https://www.flaticon.com/family/detailed-rounded/lineal
