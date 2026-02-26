"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
    member: TeamMember;
    index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-card group rounded-2xl p-6 text-center transition-shadow hover:shadow-2xl hover:shadow-accent-blue/10"
        >
            {/* Avatar placeholder */}
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan">
                <span className="text-2xl font-bold text-white">
                    {member.name.charAt(0)}
                </span>
            </div>

            <h3 className="font-heading text-lg font-bold text-white">
                {member.name}
                {member.isLead && (
                    <span className="ml-2 inline-block rounded bg-accent-cyan/20 px-2 py-0.5 text-xs text-accent-cyan">
                        Lead
                    </span>
                )}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent-cyan">
                {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {member.bio}
            </p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {member.skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-300"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
