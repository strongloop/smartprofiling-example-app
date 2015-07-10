>**A [StrongLoop license](#obtain-a-strongloop-license) is required for this
beta demo.**

# LoopBack Smart Profiling example

This application demonstrates Smart Profiling in StrongLoop Arc. 
The application sends requests to StrongLoop Process Manager (PM) with a user-defined timeout value.
The application includes a server and a client.
The server application processes requests until the specified timeout is exceeded. 
It then returns the number of successfully completed operations to the client, which displays a 
graph of the values.

## Requirements

**NOTE**: You'll need a Linux system on which to run StrongLoop PM.  Smart Profiling is supported only on Linux.

### Minimum versions

TBD

### StrongLoop license

Smart Profiling is currently in private beta release.  To get a license, please contact
sales@strongloop.com. After receiving confirmation
that a license has been provisioned, run `slc arc --licenses` to retrieve the new license key.

For more information, see ["Managing your licenses"](http://docs.strongloop.com/display/SL/Managing+your+licenses).

## Setup

### Setting up StrongLoop PM

**NOTE**: Smart profiling is supported only for StrongLoop PM on Linux systems.

#### Install PM

If you're going to run both Arc and StrongLoop PM on the same Linux system, skip this step.

If your Linux system is different than the system where you are running Arc (a typical setup), 
then you need to install StrongLoop PM on the Linux system:

```
$ npm install -g strong-pm
```

#### Run PM

On the Linux system, you're going to run PM as a transient process.
In a real production setup, you would run StrongLoop PM as a persistent service.
For more information, see [Setting up a production host](http://docs.strongloop.com/display/SLC/Setting+up+a+production+host).

Enter this command:
```
$ sl-pm
```
By default, PM will listen on port 8701.

### Get the application

On the system running Arc, download the application.  In a console, enter this command:

```
$ git clone https://github.com/strongloop/smartprofiling-example-app.git
```

### Start StrongLoop Arc

In the application root directory, start Arc:

```
$ cd smartprofiling-example-app
$ slc arc
```

StrongLoop Arc will open in your default web browser.

### Build and deploy the application

1. In Arc, click **Build & Deploy** to go to the Build & Deploy module.
1. At the top of the page, make sure **Tar file** is selected as the build type.  Click **Build**.  After a while, you will see the message `Successfully built using tar file`.
1. Under **Deploy tar file**:
  * **Fully qualified path to archive**: Enter the full path to the tar file; for example, `/Users/fred/smartprofiling-example-app-1.0.0.tgz`.  
  * **Hostname**: Domain name or IP address and port number (default 8701) of the server running PM.
  * **Processes**: Leave the default, 1. 
  * Click **Deploy**.
  * After a while, you'll see the message `Successfully deployed using tar file`.
  * Confirm that the application is running: In a web browser, load the application,by default at: `http://<pm host>:3001/`.  You should see the app page.
  
> NOTE: For this demo, make sure you run the application with one worker process to avoid any confusion.

### Configure license

TBD.

### Start Smart Profiling 

In Arc:

1. Click **Profiler** to go to the Arc Profiler module.
2. On the Profiler page, enter the host name and port number (8701 by default) where StrongLoop PM is running
3. Click 'Load'.  Arc will display the process ID of the application.
4. Click the grey box containing the process ID; it will turn blue.
5. Click **Profile settings (full)**.  You'll see the Profiler Settings dialog.
6. In the Profiler Settings dialog, click **Smart**.  
> If you do not see the profiler settings option, then your StrongLoop PM does not
> support all the options required for Smart Profiling.
> Please ensure you have the correct version, have the necessary license, and have pushed it to PM.
Enter the following values: `Event Loop Execution Threshold` - 50 and `Max Samples` - keep the default, 10.
7. Click **OK**.

There are two Smart Profiling settings: 
* **Timeout** - minimum amount of time the process which is profiling needs
spend processing a request before it begins recording profiling data for that
request. Increasing this value will reduce the overhead of running profiling,
my limiting the amount of time the profiling is running on the processes.
* **Max Cycles** - The profile data for a process will not be available until after profiling has
been turned off for that processes. Profiling can either be manually turned off
(by selecting the PID, and clicking the 'stop' button) or it can be
automatically turned off after the profiler has triggered (by exceeding the
profiler timeout) a specified number of times.

In general, the values for these settings depend on the application you're profililng.  For this demo, use:

- Threshold: 50 ms
- Max Cycles: 10

#### Start the application

Navigate to the Demo application. 

For **Timeout**, enter "50" then click "Start".

The application will start sending requests, which will process for the time
specified. The amount of work done before the timeout specified will be shown
on the graph.

#### Start the Profiler in Full Profiler Mode

In Arc, navigate to the profiler module and connect to your PM host. Select the
PID from the PID list. Ensure that the CPU profiler settings are set to
"Full Profiling" and click "Start" on the profiler.

> On the demo application you should see the graph drop after a few seconds.
> This is due to the increased overhead caused by full profiling.

After few seconds click "Stop" on the profiler in Arc to terminate
the profile.

#### Start the Profiler in Smart Profiler Mode

In Arc, navigate to the profiler module and connect to your PM host. Select the
PID from the PID list. Ensure that the CPU profiler settings are set to
"Smart Profiling" and set "Threshold" to 100, and "Max Cycles" to 10. Apply the
settings and click "Start" on the profiler.

> In the demo application you'll see that the graph does not significantly
> change. This is because of the decreased overhead of using smart profiling.

After a few minutes, increase the timeout in the demo app to 100. This will
cause the demo app to start exceeding the smart profiler timeout. After a few
seconds, Arc will automatically stop the profiler. This is because the "Max
Cycles" would have been exceeded.

You can view the CPU profiles by clicking them on in the menu on the left side of
the profiler.
