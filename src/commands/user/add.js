import { Command, flags } from '@oclif/command';
import emoji from 'node-emoji';
import chalk from 'chalk';
import path from 'path';

import { auth } from '../../utils/auth';

export class UserAdd extends Command {
    static flags = {
        id: flags.string({
            char: 'i',
            description: chalk.blue.bold('Channel name.'),
            required: true,
        }),
        type: flags.string({
            char: 't',
            description: chalk.blue.bold('Channel type.'),
            required: true,
        }),
        moderators: flags.string({
            char: 'm',
            description: chalk.blue.bold(
                'Comma separated list of moderators to add.'
            ),
            required: true,
        }),
    };

    async run() {
        const { flags } = this.parse(UserAdd);

        try {
            const client = await auth(
                path.join(this.config.configDir, 'config.json'),
                this
            );

            const channel = await client.channel(flags.type, flags.id);
            await channel.addModerators(flags.moderators.split(','));

            this.log(
                `${flags.moderators} have been added as moderators to channel ${
                    flags.type
                }:${flags.id}`,
                emoji.get('rocket')
            );
            this.exit(0);
        } catch (err) {
            this.error(err, { exit: 1 });
        }
    }
}

UserAdd.description = 'Remove users from a channel.';
