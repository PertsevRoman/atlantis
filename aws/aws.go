// Package aws handles Amazon Web Services actions.
package aws

import (
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sts"
)

// Default name of our session.
const defaultSessionName = "atlantis"
const sessionDuration = 30 * time.Minute

// Config configures our aws clients.
type Config struct {
	// Region to connect to for api calls.
	Region string
	// Role to be assumed.
	RoleARN string
	// Override the default session name.
	SessionName string
}

// CreateSession creates a new valid AWS session to be used by AWS clients.
// If RoleARN is not empty, we will assume a role. Otherwise we'll create a
// session using the AWS SDK's normal mechanism.
func (c *Config) CreateSession() (*session.Session, error) {
	awsSession, err := session.NewSessionWithOptions(session.Options{
		Config:            aws.Config{Region: aws.String(c.Region)},
		SharedConfigState: session.SharedConfigEnable,
	})
	if err != nil {
		return nil, err
	}
	if _, err = awsSession.Config.Credentials.Get(); err != nil {
		return nil, err
	}

	// generate a new session if aws role is provided
	if c.RoleARN != "" {
		return c.assumeRole(awsSession), nil
	}

	return awsSession, nil
}

// assumeRole calls Amazon's Security Token Service and attempts to assume roleArn and provide credentials for that role.
func (c *Config) assumeRole(s *session.Session) *session.Session {
	if c.SessionName == "" {
		c.SessionName = defaultSessionName
	}
	stsClient := sts.New(s, s.Config)
	creds := stscreds.NewCredentialsWithClient(stsClient, c.RoleARN, func(p *stscreds.AssumeRoleProvider) {
		p.RoleSessionName = c.SessionName
		// override default 15 minute time
		p.Duration = sessionDuration
	})

	return session.New(&aws.Config{Credentials: creds, Region: aws.String(c.Region)})
}
