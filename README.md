# StrongLoop Smart Profiling example

This application demonstrates Smart Profiling in StrongLoop Arc.
The application includes a client and a server; the client sends requests to itself with a
user-defined timeout value.
The server application processes requests until the specified timeout is exceeded.
It then returns the number of successfully completed operations to the client, which displays a
graph of the values.

## Requirements

**NOTE**:  Smart Profiling is supported only on Linux.  You'll need a Linux system on which to run StrongLoop PM.

### Minimum versions

Be sure to do `npm install -g strongloop` to ensure you have the latest version of StrongLoop Arc.

To use Smart Profiling in Arc, you must have the following versions or higher:
- StrongLoop Arc v. 1.6.6
- StrongLoop PM v. 5.0.36

Use `slc -v` to determine your versions.

### StrongLoop license

To get a license for Smart Profiling, please contact sales@strongloop.com.  After receiving confirmation
that StrongLoop has provisioned a license for you, follow the procedure below.

## Set up StrongLoop PM

**NOTE**: Smart profiling is supported only for applications running on Linux systems.  You can generate and view profiles on any system running StrongLoop Arc, but StrongLoop PM and the application _must_ run on a Linux system.

### Install PM

**NOTE**: If you're going to run both Arc and StrongLoop PM on one Linux system, skip this step.

If the Linux system where you'll run PM is different than the system where you'll run Arc (a typical setup),
then install StrongLoop PM on the Linux system:

```
$ npm install -g strong-pm
```

### Run PM

On the Linux system, you're going to run PM as a transient process.
In a real production setup, you would run StrongLoop PM as a persistent service.
For more information, see [Setting up a production host](http://docs.strongloop.com/display/SLC/Setting+up+a+production+host).

Enter this command:
```
$ sl-pm
```

This will start PM, listening by default on port 8701.

## Use Arc to build, deploy, and profile

### Get the application

On the system where you're going to run Arc, download the application.  In a console, enter this command:

```
$ git clone https://github.com/strongloop/smartprofiling-example-app.git
```

### Start StrongLoop Arc

**NOTE**: You must have already [installed StrongLoop(http://docs.strongloop.com/display/SL).

In the application root directory, start Arc:

```
$ cd smartprofiling-example-app
$ slc arc
```

StrongLoop Arc will open in your default web browser.

### Build and deploy the application

1. In Arc, click **Build & Deploy** to display the Build & Deploy module.
1. At the top of the page, make sure **Tar file** is selected as the build type.  
2. Click **Build**.  After a while, you will see the message `Successfully built using tar file`.
1. Under **Deploy tar file**:
  * **Fully qualified path to archive**: Enter the full path to the tar file; for example, `/Users/fred/smartprofiling-example-app-1.0.0.tgz`.  
  * **Hostname**: Domain name or IP address and port number (default 8701) of the server running PM.
  * **Processes**: Leave the default, 1.
  * Click **Deploy**.
  * After a while, you'll see the message `Successfully deployed using tar file`.
1. Confirm that the application is running: In a web browser, load the application,by default at: `http://<pm host>:3001/`.  You should see the app page.

> NOTE: For this demo, make sure you run the application with one worker process to avoid any confusion.

### Configure license

First, confirm you have a license for Smart Profiling as follows.

In the upper right of the window, click the icon and choose **Licenses**:

![Licenses](http://docs.strongloop.com/download/attachments/6719049/licenses.png?version=3&modificationDate=1436561496670&api=v2)

Arc will display the **Licenses** page.  It may take a moment to appear.
Ensure that there is a check next to **Smart Profiling**.

**NOTE**: If you are running Arc and StrongLoop PM both on the same Linux system, you can skip this step.

Push the license to your StrongLoop Process Manager:

1. Click **Process Manager** to display the Process Manager module.
2. Click **Add PM Host**.
3. Under **Strong PM**, enter the host name or IP address where your StrongLoop PM is running.
4. Under **Port**, enter `8701`, the default port number on which StrongLoop PM listens.
5. Click the icon next to **Acivate**.
  - Arc should display a "connected plug" icon and `1` under Count and the process ID of the application you previously deployed.
6. Under **Strong PM**, click **Actions** and choose ** Push License**.

Following this procedure will push the license from Arc to the system running StrongLoop PM.

### Use the application

Navigate to the Demo application, by default at `http://<pm-host>:3001`.

For **Timeout**, ensure the default value of "50" is present, then click **Start**.

The application will start sending requests, which will process for the time
specified. The amount of work done before the timeout specified will be shown
on the graph.

### Start Smart Profiling

In Arc:

1. Click **Profiler** to go to the Arc Profiler module.
2. Under **Hostname**, enter the host name and port number (8701 by default) where StrongLoop PM is running.
3. Click **Load**.  Arc will display the process ID of the application.
4. Click the grey box containing the process ID; it will turn blue.
5. Click **Profile settings (full)**.  You'll see the Profiler Settings dialog.
6. In the Profiler Settings dialog, click **Smart**.  
 * If you do not see the Smart Profile settings option, ensure you are running PM on Linux,
   have the correct version of PM, the necessary license, and have pushed the license to PM.
7. Enter the following values: `Event Loop Execution Threshold` - 100 and `Max Samples` - keep the default, 10.
8. Click **OK**.

> In the demo application you'll see that the graph does not significantly
> change. This is because of the decreased overhead of using Smart Profiling
> versus standard (full) profiling.

After a few minutes, increase the timeout in the demo app to 100. This will
cause the demo app to start exceeding the smart profiler timeout. After a few
seconds, Arc will automatically stop the profiler. This is because the "Max
Cycles" would have been exceeded.

To view CPU profiles, click on them in the list on the left side of the page.

There are two Smart Profiling settings:
* **Timeout** - Minimum time the process which is being profiled needs to
spend processing a request before it begins recording profiling data for that
request. Increasing this value reduces the overhead of running profiling,
by limiting the amount of time the profiling is running on the processes.
* **Max Cycles** - The profile data for a process will not be available until after profiling has
been turned off for that processes.  You can either turn off profiling manually
(by selecting the PID, and clicking the 'stop' button) or
automatically, after the profiler has triggered (by exceeding the
profiler timeout) a specified number of times.

In general, the values for these settings depend on the application you're profiling.  For this demo, use:

- Threshold: 100 ms
- Max Cycles: 10
