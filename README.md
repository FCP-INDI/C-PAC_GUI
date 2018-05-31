# C-PAC

A suite to manage, run and track your preprocessing pipelines.

## Ideas

* Separates the GUI from the main C-PAC in its own app: It enables better handling of pipelines execution, since the main C-PAC will be running on background as a scheduler/API on servers.

  > User story: Using the GUI, I organize and share my pipelines and subjects with my team, and I can schedule pipeline executions on Dozer, Ned, and AWS Batch.

* Creates the concept of environments: pipeline configs have variables about the environment that change from server to server , that could be separated into a new .yaml and reused for other pipelines.

  > User story: I want to run a pipeline on Dozer using Docker. Steve has already an optimal environment config for the server, with the correct paths and a decent estimate of resources that it will be allocated, so I borrow it from him. Using this config, I connected to Dozer CPAC daemon and saw that there is another 2 C-PAC pipelines running, so I decided to restrict the resources that my pipeline will use.
    
* Encapsulates pipelines and subjects into *projects*: today, configurations are fragmented and loosely tight. Dealing with several parts might be overwhelming to the user.

  > User story: I open my project, that has the pipelines that I am testing, the subjects and subsets from the subjects from the site NYU with left-handedness. I saw previous pipelines that I tested, so I can compare its outputs and configurations with my current pipeline version. All in one place!

* Provides ways to keep tracking the execution of a pipeline, and "debug" the pipeline: it is hard to know when a pipeline will end or how much was executed. Also, errors are only shown as crash files or a exception in the log, hard to track. A dashboard of executions would help the user to know what is going on. To test preprocessing steps without running all the pipeline for all the users, a debug feature could stop the pipeline after run the steps of interest. The outputs of the steps are shown in a organized way, so the user can reason about if the pipeline execution should continue. 

  > User story: I started my pipeline with a breakpoint on the registration step. The dashboard shows me the status of my pipeline, in which 20% of the subjects are already processed. The estimated time to finish is about 13pm. After 10min, the execution stops so I can check the registration quality of some subjects. It is ok, so I unpause the pipeline exec.

* Provides a web interface with the same structures/design from the GUI app, but it only can schedule/track pipelines from the server that the web interface is installed.

  > User story: I just want to check how my pipeline is going, but I am on my mobile. So I open CPAC web installed on Dozer, and take a look on it.
