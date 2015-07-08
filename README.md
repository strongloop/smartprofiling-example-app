>**A [StrongLoop license](#obtain-a-strongloop-license) is required for this
beta demo.**

# LoopBack Smart Profiling demo

This application demonstrates Smart Profiling in StrongLoop Arc, and illustrates its benefits. 
The application sends requests to StrongLoop Process Manager (PM) with a user-defined timeout value.
The application includes a server and a client.
The server application processes requests until the specified timeout is exceeded. 
It then returns the number of successfully completed operations to the client, which displays a 
graph of the values.

## Requirements

### Minimum versions

TBD

### StrongLoop license

Smart Profiling is currently in private beta release.  To get a license, please contact
sales@strongloop.com. After receiving confirmation
that a license has been provisioned, run `slc arc --licenses` to retrieve the new license key.

For more information, see ["Managing your licenses"](http://docs.strongloop.com/display/SL/Managing+your+licenses).

## Setup

### Setting up StrongLoop PM

To use Smart Profiling, you must run the application with StrongLoop PM.

If you want to run both Arc and StrongLoop PM on the Linux system, skip this step.

If your Linux system is different than the system where you are running Arc (which is a typical setup), 
then you need to install StrongLoop PM on the Linux system:
```
$ npm install -g strong-pm
```

In a real production setup, you would run StrongLoop PM as a persistent service.
For purposes of this demo, though, you're going to run PM as a transient process, as follows:
```
$ sl-pm
```
By default, PM will listen on port 8701.

For more information, see [Setting up a production host](http://docs.strongloop.com/display/SLC/Setting+up+a+production+host).

#### Supported Platforms

Smart profiling is currently only supported for StrongLoop PM on Linux systems.

### Build and deploy the application

Download and build the application

```
$ git clone https://github.com/strongloop/smartprofiling-demo.git
$ cd smartprofiling-demo
$ slc build
```

Then deploy the application to Process Manager:

```
slc deploy http://<pm server>:<pm port>/
```

### Connect to the application

In your web browser, navigate to application running on the PM. Typically this
will be at: `http://<pm host>:3001/`.

### Start StrongLoop Arc

From inside the `smartprofiling-demo` application directory, run

```
slc arc
```

## Running the Demonstration

Enter the Profiler module in Strong Arc, by clicking the profiler button on the
Strong Arc landing page.

On the Profiler page, enter the host and port information for you Strong PM, and
click 'load'.

### Setting up the Smart Profiler Settings

You can configure the Smart Profiler settings by clicking the "Profiler Settings"
option the will appear beside the PID list in the Arc profiler.

> If you do not see the profiler settings option, then the Strong PM does not
> support all the options required for using Smart Profiling from within Arc.
> Please check requirement section and confirm that StrongLoop PM is running
> the correct version.

In the profiler settings window, there are two options:

#### Timeout

This value is the minimum amount of time the process which is profiling needs
spend processing a request before it begins recording profiling data for that
request. Increasing this value will reduce the overhead of running profiling,
my limiting the amount of time the profiling is running on the processes.

#### Max Cycles

The profile data for a process will not be available until after profiling has
been turned off for that processes. Profiling can either be manually turned off
(by selecting the PID, and clicking the 'stop' button) or it can be
automatically turned off after the profiler has triggered (by exceeding the
profiler timeout) a specified number of times.

The value for these options is highly depended on the application that is being
profiled. For this demo:

Set "Threshold" to "50 ms"
Set "Max Cycles" to "10".

### Running the Demo Application

It's recommended for this demo, that you only run one worker instance on the PM.

#### Start the demonstration application

Navigate to the Demo application. Set the timeout to "50" and click "Start"

The application will start sending requests, which will process for the time
specified. The amount of work done before the timeout specified will be shown
on the graph.

#### Start the Profiler in Full Profiler Mode

In Arc, navigate to the profiler module and connect to your PM host. Select the
PID from the PID list. Ensure that the CPU profiler settings are set to
"Full Profiling" and click "Start" on the profiler.

> On the demo application you should see the graph drop after a few seconds.
> This is due to the increased overhead caused by full profiling.

After a short while, you can click "Stop" on the profiler in Arc to terminate
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

---

[Other LoopBack demos](https://github.com/strongloop/loopback-demo)
